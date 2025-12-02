// src/pages/BlogPost.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { blogData as staticBlogData } from "../data/blogData";
import { FiShare2 } from "react-icons/fi";

const API_ENDPOINT = ""; // same endpoint as list if available

const estimateReadTime = (text = "") => {
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
};

const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [allPosts, setAllPosts] = useState([]);
  const [loading, setLoading] = useState(Boolean(API_ENDPOINT));

  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(Boolean(API_ENDPOINT));
      if (API_ENDPOINT) {
        try {
          const res = await fetch(API_ENDPOINT);
          const data = await res.json();
          if (!mounted) return;
          const posts = Array.isArray(data) ? data : data.posts || [];
          setAllPosts(posts);
          setPost(posts.find((p) => String(p.id) === String(id)));
        } catch (e) {
          console.error(e);
          setAllPosts(staticBlogData);
          setPost(staticBlogData.find((p) => String(p.id) === String(id)));
        } finally {
          if (mounted) setLoading(false);
        }
      } else {
        setAllPosts(staticBlogData);
        setPost(staticBlogData.find((p) => String(p.id) === String(id)));
        setLoading(false);
      }
    }
    load();
    return () => (mounted = false);
  }, [id]);

  if (loading) return <div className="p-10">Loading...</div>;
  if (!post) return <div className="p-10">Post not found. <button onClick={() => navigate(-1)} className="text-indigo-600">Go back</button></div>;

  const related = allPosts.filter((p) => p.category === post.category && p.id !== post.id).slice(0, 3);

  const share = () => {
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({ title: post.title, url }).catch(() => {});
    } else {
      navigator.clipboard.writeText(url);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-r from-blue-100 to-green-100 py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow overflow-hidden">
        <img src={post.image} alt={post.title} className="w-full h-72 object-cover" />
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-indigo-600">{post.category}</p>
              <h1 className="text-3xl font-bold mt-2">{post.title}</h1>
              <div className="text-sm text-gray-500 mt-2">{new Date(post.date).toLocaleDateString()} • {estimateReadTime(post.content)}</div>
            </div>

            <div className="flex gap-2">
              <button onClick={share} className="px-3 py-2 bg-indigo-600 text-white rounded-md flex items-center gap-2"><FiShare2 /> Share</button>
              <Link to="/blogs" className="px-3 py-2 border rounded-md">Back</Link>
            </div>
          </div>

          <article className="prose max-w-none mt-6 text-gray-700">
            <p>{post.content}</p>
            {/* If post has more rich content, render here */}
          </article>

          {/* Related */}
          {related.length > 0 && (
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4">Related posts</h3>
              <div className="grid sm:grid-cols-3 gap-4">
                {related.map((r) => (
                  <Link key={r.id} to={`/blog/${r.id}`} className="bg-white rounded-lg shadow p-3">
                    <img src={r.image} alt={r.title} className="h-28 w-full object-cover rounded" />
                    <h4 className="text-sm font-semibold mt-2">{r.title}</h4>
                    <p className="text-xs text-gray-500 mt-1">{new Date(r.date).toLocaleDateString()}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
