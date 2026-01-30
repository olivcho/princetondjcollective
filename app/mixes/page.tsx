import { supabase } from "../utils/supabase";
import MixesPlayer from "./MixesPlayer";
import BackLink from "../components/BackLink";

export default async function Mixes() {

    const { data, error } = await supabase
                                        .from('mixes')
                                        .select('*')
                                        .order('month', { ascending: false });

    const mixes = data || [];



    return (
        <div className="flex min-h-screen items-center justify-center bg-transparent py-12">
            <div className="flex flex-col items-center justify-center gap-12 w-full">
                <p className="text-xl md:text-2xl font-bold px-10 md:px-16">Mixes</p>
                
                <MixesPlayer mixes={mixes} />
                
                <BackLink />
            </div>
        </div>
    );
}