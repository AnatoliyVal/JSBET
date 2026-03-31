import { useEffect, useState } from "react";
import { subscribeToProfile } from "../lib/profilesService";
import type { AuthUser } from "../store/authStore";

/**
 * Hook to subscribe to a user's profile in real-time.
 * @param email User email to subscribe to.
 * @param initialData Optional fallback data while loading or if profile doesn't exist.
 */
export function useUserProfile(email?: string, initialData?: Partial<AuthUser>) {
    const [profile, setProfile] = useState<AuthUser | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!email) {
            setProfile(null);
            setLoading(false);
            return;
        }

        setLoading(true);
        const unsubscribe = subscribeToProfile(email, (data) => {
            setProfile(data);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [email]);

    return {
        profile: profile || (initialData as AuthUser) || null,
        loading
    };
}
