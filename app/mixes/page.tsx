import MixesPlayer from "./MixesPlayer";
import BackLink from "../components/BackLink";

const mixes = [
  { id: '1', track_name: 'Alchemy',             track_url: '' },
  { id: '2', track_name: 'Corleone',            track_url: '' },
  { id: '3', track_name: 'Against The Machine', track_url: '' },
  { id: '4', track_name: 'Shake It Off',        track_url: '' },
  { id: '5', track_name: 'Sunset',              track_url: '' },
  { id: '6', track_name: 'Still Want Me',       track_url: '' },
  { id: '7', track_name: 'Jazz Club',           track_url: '' },
  { id: '8', track_name: 'Config',              track_url: '' },
  { id: '9', track_name: 'Hands Up',            track_url: '' },
];

export default async function Mixes() {



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