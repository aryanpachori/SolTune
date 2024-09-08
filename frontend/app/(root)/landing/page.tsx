import { BackgroundLines } from "@/components/ui/background-lines";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircleIcon, UsersIcon, TrendingUpIcon, Sparkles } from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-black text-white overflow-hidden">
      <BackgroundLines className="flex items-center justify-center w-full flex-col px-4 py-12 relative bg-black">
        {/* Animated particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white opacity-20 animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 4 + 1}px`,
                height: `${Math.random() * 4 + 1}px`,
                animationDuration: `${Math.random() * 10 + 5}s`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            />
          ))}
        </div>

        <div className="w-full max-w-7xl mx-auto space-y-8 md:space-y-0 md:grid md:grid-cols-2 md:gap-8 relative z-10">
          {/* Left Column: Join and Create Space */}
          <div className="space-y-8 mt-8">
            {/* Join Space */}
            <Card className="bg-opacity-10 bg-gray-800 border-purple-500 hover:border-purple-400 transition-all duration-300 ease-in-out transform hover:scale-105 backdrop-blur-sm w-full overflow-hidden group pt-5 pb-5">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-pink-600 opacity-50 group-hover:opacity-75 transition-opacity duration-300" />
              <CardHeader className="relative z-10">
                <CardTitle className="text-2xl md:text-3xl font-bold text-center text-white">
                  Join a Space
                </CardTitle>
              </CardHeader>
              <CardContent className="flex justify-center relative z-10">
                <Button className="bg-white text-purple-600 hover:bg-purple-100 transition-all duration-300 ease-in-out transform hover:scale-105 px-8 py-3 text-lg rounded-full shadow-lg">
                  <UsersIcon className="mr-2 h-6 w-6" /> Join Space
                </Button>
              </CardContent>
            </Card>

            {/* Create Space */}
            <Card className="bg-opacity-10 bg-gray-800 border-pink-500 hover:border-pink-400 transition-all duration-300 ease-in-out transform hover:scale-105 backdrop-blur-sm w-full overflow-hidden group pt-5 pb-5">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-600 to-purple-600 opacity-50 group-hover:opacity-75 transition-opacity duration-300" />
              <CardHeader className="relative z-10">
                <CardTitle className="text-2xl md:text-3xl font-bold text-center text-white">
                  Create a Space
                </CardTitle>
              </CardHeader>
              <CardContent className="flex justify-center relative z-10">
                <Button className="bg-white text-pink-600 hover:bg-pink-100 transition-all duration-300 ease-in-out transform hover:scale-105 px-8 py-3 text-lg rounded-full shadow-lg">
                  <PlusCircleIcon className="mr-2 h-6 w-6" /> Create Space
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Right Column: Leaderboard */}
          <Card className="bg-opacity-10 bg-gray-800 border-blue-500 hover:border-blue-400 transition-all duration-300 ease-in-out backdrop-blur-sm w-full overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-cyan-600 opacity-30" />
            <CardHeader className="relative z-10">
              <CardTitle className="text-2xl md:text-3xl font-bold text-center text-white flex items-center justify-center">
                <Sparkles className="mr-2 h-8 w-8 text-yellow-400" />
                Leaderboard
              </CardTitle>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((position) => (
                  <div key={position} className="flex items-center justify-between bg-opacity-30 bg-gray-700 p-4 rounded-lg hover:bg-opacity-50 transition-all duration-300 ease-in-out transform hover:scale-102 group">
                    <span className="text-xl font-semibold text-blue-300 group-hover:text-blue-200">#{position}</span>
                    <span className="text-lg text-white">User{position}</span>
                    <div className="flex items-center">
                      <TrendingUpIcon className="h-5 w-5 text-green-400 mr-2" />
                      <span className="text-green-400 font-bold">{1000 - position * 100} SOL</span>
                    </div>
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