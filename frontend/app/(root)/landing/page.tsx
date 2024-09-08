import { BackgroundLines } from "@/components/ui/background-lines";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircleIcon, UsersIcon } from "lucide-react";

export default function Landing() {
  return (
    <div>
      <BackgroundLines className="flex items-center justify-center w-full flex-col px-4 bg-black">
        <div className="">
          {/* Join or Create Space */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <Card className="bg-opacity-20 bg-gray-800 border-purple-500 hover:border-purple-400 transition-all duration-300 ease-in-out transform hover:scale-105 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-center text-purple-400">
                  Join a Space
                </CardTitle>
              </CardHeader>
              <CardContent className="flex justify-center">
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white transition-all duration-300 ease-in-out transform hover:scale-105">
                  <UsersIcon className="mr-2 h-5 w-5" /> Join Space
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-opacity-20 bg-gray-800 border-pink-500 hover:border-pink-400 transition-all duration-300 ease-in-out transform hover:scale-105 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-center text-pink-400">
                  Create a Space
                </CardTitle>
              </CardHeader>
              <CardContent className="flex justify-center">
                <Button className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white transition-all duration-300 ease-in-out transform hover:scale-105">
                  <PlusCircleIcon className="mr-2 h-5 w-5" /> Create Space
                </Button>
              </CardContent>
            </Card>
          </div>
          <Card className="bg-opacity-20 bg-gray-800 border-blue-500 hover:border-blue-400 transition-all duration-300 ease-in-out backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center text-blue-400">Leaderboard</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((position) => (
                  <div key={position} className="flex items-center justify-between bg-opacity-30 bg-gray-700 p-4 rounded-lg hover:bg-opacity-50 transition-all duration-300 ease-in-out transform hover:scale-102">
                    <span className="text-xl font-semibold text-blue-300">#{position}</span>
                    <span className="text-lg">User{position}</span>
                    <span className="text-green-400 font-bold">{1000 - position * 100} SOL</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
      </BackgroundLines>
    </div>
  );
}
