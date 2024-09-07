"use client";
import React, { useEffect } from "react";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { useWallet } from "@solana/wallet-adapter-react";
import {
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
export function HomeComponent() {
  const { publicKey, signMessage } = useWallet();
  async function signNsend() {
    if(!publicKey){
      return
    }
    const message = new TextEncoder().encode("Welcome to SolTune! Connect your wallet to join the beat of music.")
    const signature = await signMessage?.(message);

  }
  useEffect(()=>{
    signNsend();
  },[publicKey])
  return (
    <div>
      <BackgroundBeamsWithCollision>
        <h2 className="text-2xl relative z-20 md:text-4xl lg:text-7xl font-bold text-center text-black dark:text-white  tracking-tight font-mono">
          Space Where Every Beat Counts!{""}
          <div className="relative mx-auto inline-block w-max [filter:drop-shadow(0px_1px_3px_rgba(27,_37,_80,_0.14))]">
            <div className="font-mono absolute left-0 top-[1px] bg-clip-text bg-no-repeat text-transparent bg-gradient-to-r py-4 from-purple-500 via-violet-500 to-pink-500 [text-shadow:0_0_rgba(0,0,0,0.1)]">
              <span className="">SolTune.</span>
            </div>
            <div className="font-mono relative bg-clip-text text-transparent bg-no-repeat bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 py-4">
              <span className="">SolTune.</span>
              <br />
            </div>
          </div>
          <div className="flex justify-center mt-5">
            {!publicKey ? <WalletMultiButton /> : <WalletDisconnectButton />}
          </div>
        </h2>
      </BackgroundBeamsWithCollision>
    </div>
  );
}
