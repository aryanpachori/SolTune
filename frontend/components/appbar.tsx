import { Button } from "@/components/ui/button";
import { useWallet } from "@solana/wallet-adapter-react";
import { MusicIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AppBar() {
  const { disconnect } = useWallet();
  const router = useRouter();
  function handleDisconnect() {
    localStorage.removeItem("token");
    disconnect();
    router.push("/");
  }
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-6 bg-opacity-30 bg-gray-900 backdrop-blur-md">
      <div className="flex items-center space-x-2">
        <MusicIcon className="h-10 w-10 text-purple-400" />
        <span className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text font-mono">
          SolTune
        </span>
      </div>
      <Button
        onClick={handleDisconnect}
        variant="outline"
        className="px-5 py-5 rounded-md bg-purple-700 text-white font-bold transition duration-200 hover:bg-white hover:text-black border-2 border-transparent hover:border-purple-600"
      >
        Disconnect Wallet
      </Button>
    </header>
  );
}
