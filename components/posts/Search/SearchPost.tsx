"use client";

import { useContext, useEffect, useState } from "react";
import AppLangContext from "../../../contexts/appCurrentLang";
import { Tag } from "../../../domain/tag/Tag";
import { getPostByTags } from "../../../services/api/post";
import { getAllPostTags } from "../../../services/api/tag";
import GenericButton from "../../generic/Buttons/GenericButton/GenericButton";
import MultipleSelectChip from "../../generic/MultiSelect/MultiSelectTags";
import style from "./SearchPost.module.scss";
import PostPeek from "../PostPeek";
import { JSONParseAllProps } from "../../../services/utils";

const SearchPost = ({ initialTags, localeBrowser }) => {
  const { appCurrentLang } = useContext(AppLangContext);
  const [tagsAppLanguage, setTagsAppLanguage] = useState(initialTags);
  const [searchedPosts, setSearchedPosts] = useState([]);

  useEffect(() => {
    if (!appCurrentLang.isDefault && appCurrentLang.locale !== localeBrowser) {
      console.log("Updating tag language");
      getAllPostTags(appCurrentLang.locale).then((resp) => {
        setTagsAppLanguage(resp);
        setSelectedTags([]);
      });
    }
  }, [appCurrentLang.locale]);

  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

  const buildTagQueryParam = (tags: Tag | Tag[]) => {
    let queryParam = "";
    if (Array.isArray(tags)) {
      for (let i = 0; i < tags.length; i++) {
        queryParam += tags[i].name;

        const lastIndex = tags.length - 1;
        if (i !== lastIndex) {
          queryParam += ",";
        }
      }
    } else {
      queryParam += tags.name;
    }
    return queryParam;
  };

  const getSearchedPosts = async () => {
    const tagQueryParam = buildTagQueryParam(selectedTags);
    const posts = await getPostByTags(tagQueryParam, appCurrentLang.locale);
    const parsedPosts = posts.map((post) => JSONParseAllProps(post));
    setSearchedPosts(parsedPosts);
  };

  return (
    <div className="largePageContainer belowNavbar">
      <div className={style.searchContainer}>
        <p>Search Post</p>
        <MultipleSelectChip
          totalListElements={tagsAppLanguage}
          selectedElements={selectedTags}
          setSelectedElements={setSelectedTags}
          labelSelect="Tags"
        />

        <GenericButton handleClick={getSearchedPosts} text="Rechercher" />
      </div>
      <div className={style.searchContainer}>
        {searchedPosts.map((post) => (
          <PostPeek post={post} />
        ))}
      </div>
    </div>
  );
};

export default SearchPost;
