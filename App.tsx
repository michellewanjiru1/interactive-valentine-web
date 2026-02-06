import { useState, useRef, useEffect } from 'react';
import { Heart, ArrowLeft, X } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Card } from '@/app/components/ui/card';
import { FallingPetalsScene } from '@/app/components/FallingPetalsScene';
import bearsImage from 'figma:asset/2f78fcbb7002fe83247b489d48f75fca6935f99f.png';
import coupleImage from 'figma:asset/c5b1b33e0b07543a636a3c44f592afc68c839c49.png';
import qrCodeImage from 'figma:asset/445bfef4b0fcb7995b03dc1c2364e5cbd3eff151.png';

type Screen = 'question' | 'code' | 'gifts' | 'song' | 'letter' | 'flowers' | 'final';

export default function App() {
  const [screen, setScreen] = useState<Screen>('question');
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const [code, setCode] = useState('');
  const [codeError, setCodeError] = useState(false);
  const [typedText, setTypedText] = useState('');
  const noButtonRef = useRef<HTMLDivElement>(null);

  const fullText = "Happy Valentine's Day Love 💕";

  // Typing animation effect for final screen
  useEffect(() => {
    if (screen === 'final') {
      setTypedText('');
      let index = 0;
      const timer = setInterval(() => {
        if (index < fullText.length) {
          setTypedText(fullText.substring(0, index + 1));
          index++;
        } else {
          clearInterval(timer);
        }
      }, 100);
      return () => clearInterval(timer);
    }
  }, [screen]);

  const moveNoButton = () => {
    const maxX = window.innerWidth - 150;
    const maxY = window.innerHeight - 100;
    const newX = Math.random() * maxX;
    const newY = Math.random() * maxY;
    setNoButtonPos({ x: newX, y: newY });
  };

  const handleCodeSubmit = () => {
    if (code === '1981') {
      setScreen('gifts');
      setCode('');
      setCodeError(false);
    } else {
      setCodeError(true);
      setCode('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCodeSubmit();
    }
  };

  return (
    <div className="min-h-screen h-screen bg-gradient-to-br from-pink-100 via-red-50 to-pink-200 flex items-center justify-center p-4 overflow-hidden">
      {/* Question Screen */}
      {screen === 'question' && (
        <div className="text-center max-w-xl w-full">
          <div className="mb-6 relative">
            <img
              src={bearsImage}
              alt="Valentine Bears"
              className="w-full max-w-xs mx-auto h-auto object-contain rounded-3xl shadow-2xl"
            />
          </div>
          <h1 className="text-4xl mb-8 text-red-600">
            Will You Be My Valentine? 💕
          </h1>
          <div className="flex gap-6 justify-center items-center relative">
            <Button
              onClick={() => setScreen('code')}
              size="lg"
              className="bg-red-500 hover:bg-red-600 text-white text-xl px-10 py-6 rounded-full shadow-lg"
            >
              Yes! 💖
            </Button>
            <div
              ref={noButtonRef}
              onMouseEnter={moveNoButton}
              style={{
                position: noButtonPos.x === 0 ? 'relative' : 'fixed',
                left: noButtonPos.x === 0 ? 'auto' : `${noButtonPos.x}px`,
                top: noButtonPos.x === 0 ? 'auto' : `${noButtonPos.y}px`,
              }}
            >
              <Button
                size="lg"
                variant="outline"
                className="border-gray-400 text-gray-600 text-2xl px-12 py-8 rounded-full shadow-lg bg-white"
              >
                No
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Secret Code Screen */}
      {screen === 'code' && (
        <div className="text-center max-w-md w-full">
          <Heart className="w-20 h-20 mx-auto mb-6 text-red-500" />
          <h2 className="text-4xl mb-4 text-red-600">Enter Secret Code</h2>
          <p className="text-gray-600 mb-8">Hint: Your birth year 🎂</p>
          <div className="space-y-4">
            <Input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter code..."
              className="text-center text-2xl py-6"
              maxLength={4}
            />
            {codeError && (
              <p className="text-red-500">Wrong code! Try again 💔</p>
            )}
            <Button
              onClick={handleCodeSubmit}
              className="w-full bg-red-500 hover:bg-red-600 text-white text-xl py-6"
            >
              Submit
            </Button>
          </div>
        </div>
      )}

      {/* Gift Selection Screen */}
      {screen === 'gifts' && (
        <div className="text-center max-w-3xl w-full">
          <h2 className="text-4xl mb-8 text-red-600">Choose Your Gift 🎁</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card
              onClick={() => setScreen('song')}
              className="p-6 cursor-pointer hover:shadow-2xl transition-shadow bg-white border-2 border-pink-200 hover:border-red-400"
            >
              <div className="text-5xl mb-3">🎵</div>
              <h3 className="text-xl text-red-600">Gift 1</h3>
              <p className="text-gray-600 text-sm">A Special Song</p>
            </Card>
            <Card
              onClick={() => setScreen('letter')}
              className="p-6 cursor-pointer hover:shadow-2xl transition-shadow bg-white border-2 border-pink-200 hover:border-red-400"
            >
              <div className="text-5xl mb-3">💌</div>
              <h3 className="text-xl text-red-600">Gift 2</h3>
              <p className="text-gray-600 text-sm">Love Letter</p>
            </Card>
            <Card
              onClick={() => setScreen('flowers')}
              className="p-6 cursor-pointer hover:shadow-2xl transition-shadow bg-white border-2 border-pink-200 hover:border-red-400"
            >
              <div className="text-5xl mb-3">💐</div>
              <h3 className="text-xl text-red-600">Gift 3</h3>
              <p className="text-gray-600 text-sm">Bouquet of Flowers</p>
            </Card>
          </div>
        </div>
      )}

      {/* Gift 1: Song */}
      {screen === 'song' && (
        <div className="text-center max-w-lg w-full">
          <h2 className="text-3xl mb-4 text-red-600">A Special Song For You 🎵</h2>
          <Card className="p-6 bg-white shadow-2xl">
            <div className="mb-4">
              <p className="text-gray-600 mb-4 text-sm">Scan this QR code or click the link below:</p>
              {/* QR Code */}
              <div className="w-48 h-48 mx-auto rounded-lg overflow-hidden mb-4">
                <img
                  src={qrCodeImage}
                  alt="QR Code"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Link */}
              <div className="bg-pink-50 p-3 rounded-lg border-2 border-pink-200">
                <p className="text-xs text-gray-500 mb-1">Or click here:</p>
                <a
                  href="https://youtu.be/kkB4qTpRx_E?si=bvIlJV5wmytaEc43"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-red-500 hover:text-red-600 underline break-all text-sm font-medium"
                >
                  Listen to Our Song 🎵
                </a>
              </div>
            </div>
            <Button
              onClick={() => setScreen('final')}
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-3"
            >
              Continue 💕
            </Button>
          </Card>
        </div>
      )}

      {/* Gift 2: Love Letter */}
      {screen === 'letter' && (
        <div className="text-center max-w-2xl w-full max-h-screen overflow-y-auto">
          <h2 className="text-3xl mb-4 text-red-600">A Love Letter 💌</h2>
          <Card className="p-6 bg-white shadow-2xl">
            <div className="bg-pink-50 p-6 rounded-lg border-2 border-pink-200 mb-4">
              <div className="font-serif text-base leading-relaxed text-gray-800 text-left">
                <p className="mb-3">My Love,</p>
                <p className="mb-3">
                  I just want to take a moment to tell you how much you mean to me. Thank you for the love, patience, and strength you bring into our family every single day. You have been my partner, my support, and my greatest blessing.
                </p>
                <p className="mb-3">
                  Through every season, you've stood by me with grace and kindness, and I am truly grateful for the life we've built together. I don't say it enough, but I appreciate you more than words can express. I love you deeply, today and always.
                </p>
                <p className="text-right mt-6">Yours forever,</p>
                <p className="text-right">Your Husband ❤️</p>
              </div>
            </div>
            <Button
              onClick={() => setScreen('final')}
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-3"
            >
              Continue 💕
            </Button>
          </Card>
        </div>
      )}

      {/* Gift 3: Flower Bouquet */}
      {screen === 'flowers' && (
        <div className="text-center max-w-4xl w-full max-h-screen overflow-y-auto">
          <Card className="p-6 bg-gradient-to-br from-pink-50 via-cream-50 to-pink-100 shadow-2xl">
            <FallingPetalsScene />
            <Button
              onClick={() => setScreen('final')}
              className="bg-red-500 hover:bg-red-600 text-white px-8 py-4 mt-4"
            >
              Continue 💕
            </Button>
          </Card>
        </div>
      )}

      {/* Final Screen */}
      {screen === 'final' && (
        <div className="text-center max-w-2xl w-full">
          <Card className="p-6 bg-white shadow-2xl">
            {/* Couple Image */}
            <div className="mb-4">
              <img
                src={coupleImage}
                alt="Our Love"
                className="w-full h-64 object-contain rounded-2xl"
              />
            </div>
            {/* Typing Animation */}
            <div className="bg-gradient-to-r from-pink-50 to-red-50 p-6 rounded-lg border-2 border-pink-200 mb-4 min-h-[80px] flex items-center justify-center">
              <h2 className="text-3xl text-red-600">
                {typedText}
                <span className="animate-pulse">|</span>
              </h2>
            </div>
            {/* Navigation Buttons */}
            <div className="flex gap-3 justify-center">
              <Button
                onClick={() => setScreen('gifts')}
                variant="outline"
                className="border-red-400 text-red-600 hover:bg-red-50 px-4 py-2 text-sm"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Gifts
              </Button>
              <Button
                onClick={() => setScreen('question')}
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 text-sm"
              >
                <X className="mr-2 h-4 w-4" />
                Exit
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}