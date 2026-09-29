import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase";
import type { Book } from "../types/book";

export function useWishlist(user: User | null) {
  const [items, setItems] = useState<{ userId: string; books: Book[] } | null>(null);

  // Only expose the wishlist that belongs to the current user
  const wishlist = user && items?.userId === user.id ? items.books : [];
  const setWishlist = (books: Book[]) => user && setItems({ userId: user.id, books });

  // Load the wishlist whenever the signed-in user changes
  useEffect(() => {
    if (!user) return;

    supabase
      .from("wishlists")
      .select("*")
      .eq("user_id", user.id)
      .then(({ data, error }) => {
        if (!error && data) {
          setItems({
            userId: user.id,
            books: data.map((item) => ({
              image: item.book_image,
              title: item.book_title,
              prologue: item.book_prologue,
              rating: item.book_rating,
            })),
          });
        }
      });
  }, [user]);

  const isInWishlist = (bookTitle: string) =>
    wishlist.some((book) => book.title === bookTitle);

  const addToWishlist = async (book: Book) => {
    if (!user) return;

    if (isInWishlist(book.title)) {
      alert("This book is already in your wishlist!");
      return;
    }

    const { error } = await supabase.from("wishlists").insert({
      user_id: user.id,
      book_title: book.title,
      book_image: book.image,
      book_prologue: book.prologue,
      book_rating: book.rating,
    });

    if (!error) {
      setWishlist([...wishlist, book]);
      alert("Book added to your wishlist!");
    } else {
      alert("Failed to add book to wishlist");
    }
  };

  const removeFromWishlist = async (bookTitle: string) => {
    if (!user) return;

    const { error } = await supabase
      .from("wishlists")
      .delete()
      .eq("user_id", user.id)
      .eq("book_title", bookTitle);

    if (!error) {
      setWishlist(wishlist.filter((book) => book.title !== bookTitle));
      alert("Book removed from wishlist");
    }
  };

  return { wishlist, isInWishlist, addToWishlist, removeFromWishlist };
}
