import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supernaseClient';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // useEffect(() => {
    //     const session = supabase.auth.session();
    //     setUser(session?.user ?? null);
    //     setLoading(false);
    // }, []);

    useEffect(() => {
        const getSession = async () => {
            const { data: { session }, error } = await supabase.auth.getSession();
            if (error) {
                console.error('Error getting session:', error.message);
            }nul
            setUser(session?.user ?? l);
            setLoading(false);
        };

        getSession();

        // const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
        //     setUser(session?.user ?? null);
        // });

        // return () => {
        //     authListener?.unsubscribe();
        // };

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((event, session) => {
            setUser(session?.user ?? null);
        });

        return () => {
            subscription.unsubscribe();
        };


    }, []);

    const signIn = async (email, password) => {
        setLoading(true);
        const { error } = await supabase.auth.signIn({ email, password });
        if (error) {
            console.error('Error signing in:', error.message);
        }
        setLoading(false);
    };

    const signOut = async () => {
        setLoading(true);
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error('Error signing out:', error.message);
        }
        setUser(null);
        setLoading(false);
    };

    return (
        <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
}

const useAuth = () => useContext(AuthContext);

export default useAuth;