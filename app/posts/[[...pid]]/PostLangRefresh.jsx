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

  useEffect(() => {
    // console.log("appCurrentLang", appCurrentLang);
    // console.log("post", post);
    if (!appCurrentLang.isDefault && appCurrentLang.locale !== post.language) {
      console.log("Difference between language settings and language of post");
      if (Array.isArray(post.sibling && post.sibling.length > 1)) {
        const postToDisplay = post.sibling.filter(
          (post) => post.language === appCurrentLang.locale
        );
        if (postToDisplay) {
          // We found a sibling o the post. Redirecting to him
          const titleExtracted = parseSlateFormatSimple(postToDisplay.title);
          router.push(titleExtracted);
          //TODO translate
          toast.info("Redirection vers le post traduit.");
        } else {
          // Post has sibling but no one in the relevant language
          router.push("/");
          //TODO translate
          toast.info(
            "Le post n'existe pas dans cette langue, redirection vers la home.",
            {
              toastId: "change",
            }
          );
        }
      } else {
        console.log("LAAA");
        // Post has no sibling. Redirection to home.

        // router.push("/");

        //TODO translate
        toast.info("Le post n'existe pas, redirection vers la home.", {
          toastId: "change",
        });
      }
    }
  }, [appCurrentLang.locale]);
}
