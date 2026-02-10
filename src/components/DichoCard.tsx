"use client";

import { useState } from "react";
import { DichoWithRelations } from "@/lib/types";

interface DichoCardProps {
  dicho: DichoWithRelations;
  currentUserId: string;
}

function timeAgo(dateStr: string): string {
  const now = new Date();
  const date = new Date(dateStr);
  const diffMs = now.getTime() - date.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHr = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHr / 24);

  if (diffDay > 30) return date.toLocaleDateString("es-CO");
  if (diffDay > 0) return `hace ${diffDay}d`;
  if (diffHr > 0) return `hace ${diffHr}h`;
  if (diffMin > 0) return `hace ${diffMin}m`;
  return "ahora";
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

const AVATAR_COLORS = [
  "bg-amber-500",
  "bg-emerald-500",
  "bg-blue-500",
  "bg-purple-500",
  "bg-rose-500",
  "bg-teal-500",
  "bg-orange-500",
  "bg-indigo-500",
];

function getAvatarColor(userId: string): string {
  let hash = 0;
  for (let i = 0; i < userId.length; i++) {
    hash = userId.charCodeAt(i) + ((hash << 5) - hash);
  }
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

export default function DichoCard({ dicho, currentUserId }: DichoCardProps) {
  const [likes, setLikes] = useState(dicho._count.likes);
  const [liked, setLiked] = useState(false);
  const [shares, setShares] = useState(dicho._count.shares);
  const [shared, setShared] = useState(false);
  const [commentCount, setCommentCount] = useState(dicho._count.comments);
  const [comments, setComments] = useState(dicho.comments || []);
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const displayName = dicho.isAnonymous ? "Anonimo" : dicho.user.name;
  const displayUsername = dicho.isAnonymous
    ? "anonimo"
    : dicho.user.username;

  const handleLike = async () => {
    const prev = liked;
    setLiked(!liked);
    setLikes((l) => (prev ? l - 1 : l + 1));

    try {
      await fetch(`/api/dichos/${dicho.id}/like`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: currentUserId }),
      });
    } catch {
      setLiked(prev);
      setLikes((l) => (prev ? l + 1 : l - 1));
    }
  };

  const handleShare = async () => {
    if (shared) return;
    setShared(true);
    setShares((s) => s + 1);

    try {
      await fetch(`/api/dichos/${dicho.id}/share`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: currentUserId }),
      });
    } catch {
      setShared(false);
      setShares((s) => s - 1);
    }
  };

  const handleComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim() || submitting) return;

    setSubmitting(true);
    try {
      const res = await fetch(`/api/dichos/${dicho.id}/comment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: currentUserId, text: commentText }),
      });
      const newComment = await res.json();
      setComments((prev) => [newComment, ...prev]);
      setCommentCount((c) => c + 1);
      setCommentText("");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <article className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="px-4 sm:px-5 pt-4 sm:pt-5 pb-3 flex items-start gap-3">
        <div
          className={`w-11 h-11 rounded-full ${getAvatarColor(dicho.user.id)} flex items-center justify-center text-white font-bold text-sm shrink-0`}
        >
          {getInitials(displayName)}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-gray-900 truncate">
              {displayName}
            </span>
            <span className="text-gray-400 text-sm">@{displayUsername}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-400 mt-0.5">
            <span>{timeAgo(dicho.createdAt)}</span>
            <span>&middot;</span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-amber-50 text-amber-700 rounded-full font-medium">
              <svg
                className="w-3 h-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              {dicho.departamento.name}
            </span>
          </div>
        </div>
      </div>

      {/* Dicho text */}
      <div className="px-4 sm:px-5 pb-3">
        <blockquote className="text-lg sm:text-xl font-serif text-gray-800 leading-relaxed italic">
          &ldquo;{dicho.text}&rdquo;
        </blockquote>
        {dicho.meaning && (
          <p className="mt-2 text-sm text-gray-500">{dicho.meaning}</p>
        )}
        {dicho.author && !dicho.isAnonymous && (
          <p className="mt-1 text-xs text-gray-400">
            &mdash; {dicho.author}
          </p>
        )}
      </div>

      {/* Actions */}
      <div className="px-4 sm:px-5 py-3 border-t border-gray-50 flex items-center justify-between">
        <button
          onClick={handleLike}
          className={`flex items-center gap-1.5 text-sm font-medium transition-colors cursor-pointer ${
            liked
              ? "text-red-500"
              : "text-gray-400 hover:text-red-400"
          }`}
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill={liked ? "currentColor" : "none"} stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          {likes}
        </button>

        <button
          onClick={() => setShowComments(!showComments)}
          className="flex items-center gap-1.5 text-sm font-medium text-gray-400 hover:text-blue-500 transition-colors cursor-pointer"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          {commentCount}
        </button>

        <button
          onClick={handleShare}
          className={`flex items-center gap-1.5 text-sm font-medium transition-colors cursor-pointer ${
            shared
              ? "text-green-500"
              : "text-gray-400 hover:text-green-500"
          }`}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          {shares}
        </button>
      </div>

      {/* Comments section */}
      {showComments && (
        <div className="px-4 sm:px-5 pb-4 border-t border-gray-50">
          <form onSubmit={handleComment} className="flex gap-2 mt-3">
            <input
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Escribe un comentario..."
              className="flex-1 px-3 py-2 bg-gray-50 rounded-full text-sm border border-gray-200 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
            />
            <button
              type="submit"
              disabled={submitting || !commentText.trim()}
              className="px-4 py-2 bg-amber-500 text-white text-sm rounded-full font-medium hover:bg-amber-600 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              Enviar
            </button>
          </form>

          {comments.length > 0 && (
            <div className="mt-3 space-y-2">
              {comments.map((comment) => (
                <div key={comment.id} className="flex gap-2 items-start">
                  <div
                    className={`w-7 h-7 rounded-full ${getAvatarColor(comment.user.id)} flex items-center justify-center text-white font-bold text-xs shrink-0`}
                  >
                    {getInitials(comment.user.name)}
                  </div>
                  <div className="bg-gray-50 rounded-xl px-3 py-2 flex-1">
                    <span className="font-semibold text-xs text-gray-700">
                      {comment.user.name}
                    </span>
                    <p className="text-sm text-gray-600">{comment.text}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </article>
  );
}
