import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'gameover' | 'win'>('menu');
  const [playerPosition, setPlayerPosition] = useState(0);
  const [alicePosition, setAlicePosition] = useState(0);
  const [health, setHealth] = useState(100);
  const [distance, setDistance] = useState(0);

  const startGame = () => {
    setGameState('playing');
    setPlayerPosition(0);
    setAlicePosition(0);
    setHealth(100);
    setDistance(0);
  };

  const runForward = () => {
    if (gameState !== 'playing') return;
    
    const newPosition = playerPosition + Math.floor(Math.random() * 15 + 10);
    const aliceMove = alicePosition + Math.floor(Math.random() * 10 + 5);
    
    setPlayerPosition(newPosition);
    setAlicePosition(aliceMove);
    setDistance(newPosition - aliceMove);

    if (aliceMove >= newPosition - 10) {
      const newHealth = health - 25;
      setHealth(newHealth);
      if (newHealth <= 0) {
        setGameState('gameover');
      }
    }

    if (newPosition >= 100) {
      setGameState('win');
    }
  };

  const hideInRoom = () => {
    if (gameState !== 'playing') return;
    
    const success = Math.random() > 0.4;
    if (success) {
      setAlicePosition(Math.max(0, alicePosition - 5));
      setDistance(playerPosition - alicePosition);
    } else {
      const newHealth = health - 15;
      setHealth(newHealth);
      if (newHealth <= 0) {
        setGameState('gameover');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-red-950">
      {gameState === 'menu' && (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
          <div className="text-center space-y-8 animate-fade-in max-w-4xl">
            <h1 className="text-7xl md:text-9xl font-bold text-white tracking-wider" 
                style={{ fontFamily: 'Creepster, cursive', textShadow: '0 0 30px rgba(139, 24, 24, 0.8)' }}>
              ESCAPE FROM<br/>ALICE
            </h1>
            <p className="text-2xl text-red-400 italic" style={{ fontFamily: 'Creepster, cursive' }}>
              SHAPP SHAPP
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
              <Button 
                onClick={startGame}
                className="bg-red-800 hover:bg-red-900 text-white text-xl px-12 py-6 rounded-none border-2 border-red-600"
              >
                НАЧАТЬ ИГРУ
              </Button>
            </div>

            <div className="mt-16 flex justify-center gap-8">
              <div className="flex flex-col items-center text-white">
                <Icon name="Activity" size={48} className="text-red-500 mb-2" />
                <span className="text-sm">Убегай</span>
              </div>
              <div className="flex flex-col items-center text-white">
                <Icon name="AlertTriangle" size={48} className="text-yellow-500 mb-2" />
                <span className="text-sm">Прячься</span>
              </div>
              <div className="flex flex-col items-center text-white">
                <Icon name="Lock" size={48} className="text-blue-500 mb-2" />
                <span className="text-sm">Выживай</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {gameState === 'playing' && (
        <div className="container mx-auto p-4 pt-20">
          <Card className="bg-black/80 border-red-900 border-2">
            <CardHeader>
              <CardTitle className="text-white text-3xl" style={{ fontFamily: 'Creepster, cursive' }}>
                Школьный коридор
              </CardTitle>
              <CardDescription className="text-gray-400">
                Бегите к выходу, пока Алиса не настигла вас!
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-white">
                  <span>Здоровье</span>
                  <span>{health}%</span>
                </div>
                <Progress value={health} className="h-4" />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-white">
                  <span>Прогресс до выхода</span>
                  <span>{playerPosition}%</span>
                </div>
                <Progress value={playerPosition} className="h-4 bg-gray-700" />
              </div>

              <div className="bg-red-950/50 p-4 rounded border border-red-900">
                <p className="text-white text-lg">
                  Расстояние до Алисы: <span className={distance < 20 ? 'text-red-500 font-bold' : 'text-green-500'}>{distance > 0 ? distance : 'Опасно!'}</span>
                </p>
                {distance < 20 && (
                  <p className="text-red-400 text-sm mt-2 animate-pulse">⚠️ Алиса рядом!</p>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={runForward}
                  className="flex-1 bg-red-800 hover:bg-red-900 text-white py-8 text-xl"
                >
                  <Icon name="MoveRight" className="mr-2" size={24} />
                  Бежать вперёд
                </Button>
                <Button 
                  onClick={hideInRoom}
                  className="flex-1 bg-gray-800 hover:bg-gray-900 text-white py-8 text-xl border-2 border-gray-600"
                >
                  <Icon name="DoorClosed" className="mr-2" size={24} />
                  Спрятаться
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {gameState === 'gameover' && (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
          <div className="text-center space-y-8 animate-scale-in">
            <h2 className="text-8xl font-bold text-red-600" style={{ fontFamily: 'Creepster, cursive' }}>
              GAME OVER
            </h2>
            <p className="text-white text-2xl">Алиса поймала вас...</p>
            <Button 
              onClick={startGame}
              className="bg-red-800 hover:bg-red-900 text-white text-xl px-12 py-6"
            >
              Попробовать снова
            </Button>
          </div>
        </div>
      )}

      {gameState === 'win' && (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
          <div className="text-center space-y-8 animate-scale-in">
            <h2 className="text-8xl font-bold text-green-500" style={{ fontFamily: 'Creepster, cursive' }}>
              ПОБЕДА!
            </h2>
            <p className="text-white text-2xl">Вы выбрались из школы!</p>
            <Button 
              onClick={startGame}
              className="bg-green-700 hover:bg-green-800 text-white text-xl px-12 py-6"
            >
              Играть снова
            </Button>
          </div>
        </div>
      )}

      <div className="fixed bottom-4 right-4">
        <Tabs defaultValue="characters" className="w-full max-w-md">
          <TabsList className="grid w-full grid-cols-2 bg-black/80 border border-red-900">
            <TabsTrigger value="characters" className="text-white data-[state=active]:bg-red-900">
              Персонажи
            </TabsTrigger>
            <TabsTrigger value="rules" className="text-white data-[state=active]:bg-red-900">
              Правила
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="characters" className="bg-black/90 p-4 border border-red-900 rounded">
            <div className="space-y-4">
              <Card className="bg-red-950/50 border-red-800">
                <CardHeader className="pb-3">
                  <CardTitle className="text-white text-lg flex items-center gap-2">
                    <img src="https://v3b.fal.media/files/b/koala/mYlK3pRLplDCitn2WH0GT_output.png" 
                         alt="Alice" 
                         className="w-12 h-12 rounded-full object-cover border-2 border-red-600" />
                    Алиса
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 text-sm">
                    Опасный преследователь. Движется быстро и непредсказуемо.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/50 border-gray-700">
                <CardHeader className="pb-3">
                  <CardTitle className="text-white text-lg flex items-center gap-2">
                    <Icon name="User" className="text-blue-400" />
                    Игрок
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 text-sm">
                    Вы - ученик, пытающийся выбраться из школы живым.
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="rules" className="bg-black/90 p-4 border border-red-900 rounded">
            <div className="space-y-3 text-white text-sm">
              <div>
                <h3 className="font-bold text-red-400 mb-1">🎯 Цель:</h3>
                <p className="text-gray-300">Достичь 100% прогресса до выхода</p>
              </div>
              <div>
                <h3 className="font-bold text-red-400 mb-1">🏃 Бег:</h3>
                <p className="text-gray-300">Продвигает вперёд, но Алиса тоже движется</p>
              </div>
              <div>
                <h3 className="font-bold text-red-400 mb-1">🚪 Укрытие:</h3>
                <p className="text-gray-300">Шанс замедлить Алису или потерять здоровье</p>
              </div>
              <div>
                <h3 className="font-bold text-red-400 mb-1">❤️ Здоровье:</h3>
                <p className="text-gray-300">При 0% - проигрыш</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;