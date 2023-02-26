import Link from "next/link";
import BackOfficeLayout from "../../../../components/back_office/layouts/BackOfficeLayout";
import DisplayHTML from "../../../../components/generic/wysiwyg/DisplayHTML";
import { Post } from "../../../../domain/post/Post";
import { getAllPosts } from "../../../../services/api/post";

export default async function PostList({ params }) {
  const posts = await getAllPosts();
  const postedParsed: Post[] = posts.map((post) =>
    Post.builder()
      .id(post.id)
      .url(post.url)
      .mainImageUrl(post.mainImageUrl)
      .title(post.title)
      .createdAt(post.createdAt)
      .shortDescription(post.shortDescription)
      .tags(post.Tags)
      .build()
  );

  return (
    <>
      <BackOfficeLayout>
        <p>Liste de posts</p>
        {postedParsed.map((post) => (
          <Link href={`manage/posts/edit/${post.id}`}>
            <div>
              <p>
                <DisplayHTML slateText={post.title} />
              </p>
            </div>
          </Link>
        ))}
      </BackOfficeLayout>
    </>
  );
}
