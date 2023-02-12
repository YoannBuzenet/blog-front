"use client";

import { useContext, useEffect } from "react";
import AppCurrentLangContext from "../../../contexts/appCurrentLang";
import { parseSlateFormatSimple } from "../../../services/react-slate";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { PostManager } from "../../../domain/post/PostManager";

export default function PostLangRefresh({ postParsed }) {
  const post = PostManager.fromJSONToDomain(postParsed);

  const { appCurrentLang } = useContext(AppCurrentLangContext);

  const router = useRouter();

  console.log("post parsed", postParsed);

  useEffect(() => {
    if (!appCurrentLang.isDefault && appCurrentLang.locale !== post.language) {
      console.log("Difference between language settings and language of post");
      console.log("appCurrentLang", appCurrentLang);
      console.log("post.language", post.language);
      console.log("post", post);
      console.log("post.sibling", post.sibling);

      if (Array.isArray(post.sibling) && post.sibling.length > 0) {
        const postToDisplay = post.sibling.find(
          (post) => post.language === appCurrentLang.locale
        );
        console.log("postToDisplay", postToDisplay);
        if (postToDisplay) {
          // We found a sibling of the post. Redirecting to him
          router.push(`/posts/${postToDisplay.id}`);
          //TODO translate
          toast.info(<p>Redirection vers le post traduit.</p>, {
            toastId: "change",
          });
        } else {
          // Post has sibling but no one in the relevant language
          router.push("/");
          //TODO translate
          toast.info(
            <p>
              Le post n'existe pas dans cette langue, redirection vers la home
            </p>,
            {
              toastId: "redirectHomeNoRelevantSibling",
            }
          );
        }
      } else {
        // Post has no sibling. Redirection to home.
        router.push("/");

        //TODO translate
        toast.info(<p>Le post n'existe pas, redirection vers la home</p>, {
          toastId: "redirectHomeNoSibling",
        });
      }
    }
  }, [appCurrentLang.locale]);
}
