import { writeClient } from "@/sanity/lib/client";
import { User } from "next-auth";

/**
 * Saves a user to Sanity, ensuring the ID is sanitized and image URL is valid.
 * @param user - The authenticated user object from NextAuth
 */
export async function saveUserToSanity(user: User) {
    if (!user.email) return;

    const safeId = `user-${user.email.replace(/[@.]/g, "_")}`;

    const doc = {
        _type: "user",
        _id: safeId,
        name: user.name ?? "",
        email: user.email,
        image: typeof user.image === "string" ? user.image : undefined,
    };

    try {
        await writeClient.createOrReplace(doc);
    } catch (err) {
        console.error("Failed to save user to Sanity:", err);
    }
}
