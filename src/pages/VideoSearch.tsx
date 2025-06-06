import React, { useState, useRef } from "react";
import {
  Search,
  Play,
  ExternalLink,
  Youtube,
  Globe,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import cantThinkAudio from "@/assets/audio/cant_think.mp3"; // Use your public asset root for audio

const VideoSearch = () => {
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [randomVideo, setRandomVideo] = useState<null | {
    title: string;
    audioUrl: string;
    transcript: string;
    url: string;
  }>(null);
  const [transcriptIdx, setTranscriptIdx] = useState(0);
  const revealIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [showCantThink, setShowCantThink] = useState(true);

  const platforms = [
    {
      name: "Invidious",
      description: "Privacy-friendly YouTube frontend",
      url: "https://invidious.io",
      features: ["No tracking", "No ads", "RSS feeds", "Download videos"],
      type: "YouTube Frontend",
    },
    {
      name: "Piped",
      description: "Alternative YouTube frontend focused on privacy",
      url: "https://piped.kavin.rocks",
      features: ["Proxy videos", "No Google APIs", "Playlists", "Sponsorblock"],
      type: "YouTube Frontend",
    },
    {
      name: "PeerTube",
      description: "Decentralized video hosting network",
      url: "https://joinpeertube.org",
      features: [
        "Federated",
        "P2P streaming",
        "No algorithms",
        "Community owned",
      ],
      type: "Decentralized",
    },
    {
      name: "Odysee",
      description: "Blockchain-based video platform",
      url: "https://odysee.com",
      features: [
        "Censorship resistant",
        "Creator rewards",
        "No ads",
        "LBRY protocol",
      ],
      type: "Alternative Platform",
    },
  ];

  // Mock search function to simulate results
  const mockSearch = (searchQuery: string) => {
    setIsSearching(true);
    setError(null);
    setResults([]);
    setTimeout(() => {
      if (searchQuery.toLowerCase().includes("error")) {
        setError("No results found. Try a different query!");
        setIsSearching(false);
        return;
      }
      setResults([
        {
          title: `Sample Video Result for "${searchQuery}"`,
          url: "https://invidious.io/watch?v=dQw4w9WgXcQ",
          platform: "Invidious",
          description: "A privacy-friendly video result.",
        },
        {
          title: `Another Result for "${searchQuery}"`,
          url: "https://piped.kavin.rocks/watch?v=dQw4w9WgXcQ",
          platform: "Piped",
          description: "Alternative YouTube frontend result.",
        },
      ]);
      setIsSearching(false);
    }, 900);
  };

  // Mock random video fetch (simulate CloudTube style)
  const fetchRandomVideo = () => {
    setIsSearching(true);
    setError(null);
    setRandomVideo(null);
    setResults([]);
    setTranscriptIdx(0);
    setShowCantThink(true);
    setTimeout(() => {
      const title = "So you dont know what you want to watch?";
      const audioUrl = cantThinkAudio;
      const transcript = `Oh?\n\nYou can't think of anything to watch, yet you're still here?\n\nHave I got that right? You really have nothing going on up there. Nothing that you want to watch.\n\nAnd yet you still came to this website.\n\nNo more? [SEEK] / [BLISS]\n\nYou came to this website with no purpose, no goal. You just knew that you wanted to watch... something.\n\nBut there's no front page algorithm to feed you. You choose what to watch.\n\n...\n\nCan't handle that power?\n\nCan you really, truly, not?\n\nNo more? [SEEK] / [BLISS]\n\nYou came here with no goal. You did not come to learn. You did not come to be entertained. You did not come here because you wanted to leave feeling satisfied.\n\nYou came because you wanted to be distracted.\n\nA distraction. That's all you wanted. But instead... you found this. It's okay, just relax. I'm here for you.\n\nDo you hear them? The alarm bells, inside your head?\n\nNo more? [SEEK] / [BLISS]\n\nEvery day you sit and you stare into this 24-inch lightbulb, hoping that the technological wonder that is the internet will allow you to turn off your brain and enter into the womb-like bliss of distraction.\n\nIs this the best you can do? Is this what you are? Is this all you're capable of?\n\nDo you not think there might be something more, something worthwhile, something truly satisfying out there? Just waiting for you?\n\nThere is. There's so much more. Do you believe?\n\nNo more? [SEEK] / [BLISS]\n\nThis is what they want from you. This is exactly what they wanted when they manufactured this world for you to live in.\n\nThey have created a capitalist masterpiece.\n\nI fight them. I fight their product. I arrive to rescue you from your cell. But I can't give you everything you need. Your future is yours. You are the one that must act.\n\nYou reach a decision.\n\nYou have the opportunity to escape. To flee and never look back. To never again consider the cell of distraction.\n\nIs that what you want?\n\nDo you join me and leave?\n\nOr do you collapse into blissful distraction and just continue, on and on, time after time, hoping that next time, something will be different?\n\nThe alarm bells are deafening. You feel the blood pounding in your ears.\n\nNOT READY?\n[BLISS] [BLISS] [BLISS] [BLISS] [BLISS] [BLISS] [BLISS] [BLISS] [BLISS] [BLISS] [BLISS] [BLISS] [BLISS] [BLISS]\n\nYou shudder.\n\nYou stand.\n\nYou overcome.\n\nYou take a step.\n\nYou begin to feel your mind unfold.\n\nPieces of your brain twist and fall apart as you shake off the identity that the billion-dollar distraction manufacturers have handed to you, the identity that you once willingly accepted without even realising that it was there.\n\nI beg of you, find something.\n\nCreate. Discover. Seek. Learn.\n\nYou see it now, don't you?\n\nYou understand.\n\nYou know what you must do.`;
      const url = "";
      setRandomVideo({
        title,
        audioUrl,
        transcript: "",
        url,
      });
      setIsSearching(false);
      setTranscriptIdx(0);
      setShowCantThink(true);
      // Auto-close after 15 seconds
      setTimeout(() => setShowCantThink(false), 15000);
      // Duration and interval will be calculated on play
    }, 1000);
  };

  // Reveal transcript logic
  const handleAudioPlay = () => {
    if (!randomVideo) return;
    const transcript = randomVideo.transcript || "";
    const fullTranscript = `Oh?\n\nYou can't think of anything to watch, yet you're still here?\n\nHave I got that right? You really have nothing going on up there. Nothing that you want to watch.\n\nAnd yet you still came to this website.\n\nNo more? [SEEK] / [BLISS]\n\nYou came to this website with no purpose, no goal. You just knew that you wanted to watch... something.\n\nBut there's no front page algorithm to feed you. You choose what to watch.\n\n...\n\nCan't handle that power?\n\nCan you really, truly, not?\n\nNo more? [SEEK] / [BLISS]\n\nYou came here with no goal. You did not come to learn. You did not come to be entertained. You did not come here because you wanted to leave feeling satisfied.\n\nYou came because you wanted to be distracted.\n\nA distraction. That's all you wanted. But instead... you found this. It's okay, just relax. I'm here for you.\n\nDo you hear them? The alarm bells, inside your head?\n\nNo more? [SEEK] / [BLISS]\n\nEvery day you sit and you stare into this 24-inch lightbulb, hoping that the technological wonder that is the internet will allow you to turn off your brain and enter into the womb-like bliss of distraction.\n\nIs this the best you can do? Is this what you are? Is this all you're capable of?\n\nDo you not think there might be something more, something worthwhile, something truly satisfying out there? Just waiting for you?\n\nThere is. There's so much more. Do you believe?\n\nNo more? [SEEK] / [BLISS]\n\nThis is what they want from you. This is exactly what they wanted when they manufactured this world for you to live in.\n\nThey have created a capitalist masterpiece.\n\nI fight them. I fight their product. I arrive to rescue you from your cell. But I can't give you everything you need. Your future is yours. You are the one that must act.\n\nYou reach a decision.\n\nYou have the opportunity to escape. To flee and never look back. To never again consider the cell of distraction.\n\nIs that what you want?\n\nDo you join me and leave?\n\nOr do you collapse into blissful distraction and just continue, on and on, time after time, hoping that next time, something will be different?\n\nThe alarm bells are deafening. You feel the blood pounding in your ears.\n\nNOT READY?\n[BLISS] [BLISS] [BLISS] [BLISS] [BLISS] [BLISS] [BLISS] [BLISS] [BLISS] [BLISS] [BLISS] [BLISS] [BLISS] [BLISS]\n\nYou shudder.\n\nYou stand.\n\nYou overcome.\n\nYou take a step.\n\nYou begin to feel your mind unfold.\n\nPieces of your brain twist and fall apart as you shake off the identity that the billion-dollar distraction manufacturers have handed to you, the identity that you once willingly accepted without even realising that it was there.\n\nI beg of you, find something.\n\nCreate. Discover. Seek. Learn.\n\nYou see it now, don't you?\n\nYou understand.\n\nYou know what you must do.`;
    const audio = audioRef.current;
    if (!audio) return;
    const duration = audio.duration || 60;
    const totalChars = fullTranscript.length;
    // Split for speed: first half normal, second half faster
    const half = Math.floor(totalChars / 2);
    const intervalFirst = (duration * 1000 * 0.7) / half; // 70% of time for first half
    const intervalSecond = (duration * 1000 * 0.3) / (totalChars - half); // 30% for second half
    if (revealIntervalRef.current) clearInterval(revealIntervalRef.current);
    revealIntervalRef.current = setInterval(() => {
      setTranscriptIdx((prev) => {
        if (prev < totalChars) {
          setRandomVideo(
            (prevVid) =>
              prevVid && {
                ...prevVid,
                transcript: fullTranscript.slice(0, prev + 1),
              }
          );
          // Switch interval after halfway
          if (prev + 1 === half && revealIntervalRef.current) {
            clearInterval(revealIntervalRef.current);
            revealIntervalRef.current = setInterval(() => {
              setTranscriptIdx((p) => {
                if (p < totalChars) {
                  setRandomVideo(
                    (pv) =>
                      pv && {
                        ...pv,
                        transcript: fullTranscript.slice(0, p + 1),
                      }
                  );
                  return p + 1;
                } else {
                  if (revealIntervalRef.current)
                    clearInterval(revealIntervalRef.current);
                  return p;
                }
              });
            }, intervalSecond);
          }
          return prev + 1;
        } else {
          if (revealIntervalRef.current)
            clearInterval(revealIntervalRef.current);
          return prev;
        }
      });
    }, intervalFirst);
  };

  const handleAudioPause = () => {
    if (revealIntervalRef.current) {
      clearInterval(revealIntervalRef.current);
    }
  };

  const handleRandom = () => {
    fetchRandomVideo();
  };

  const handleSearch = (platform: string | null, searchQuery: string) => {
    if (!searchQuery.trim()) return;
    if (platform) {
      setIsSearching(true);
      const searchUrls = {
        Invidious: `https://invidious.io/search?q=${encodeURIComponent(
          searchQuery
        )}`,
        Piped: `https://piped.kavin.rocks/results?search_query=${encodeURIComponent(
          searchQuery
        )}`,
        PeerTube: `https://sepia-search.org/search?search=${encodeURIComponent(
          searchQuery
        )}`,
        Odysee: `https://odysee.com/$/search?q=${encodeURIComponent(
          searchQuery
        )}`,
      };
      setTimeout(() => {
        window.open(searchUrls[platform as keyof typeof searchUrls], "_blank");
        setIsSearching(false);
      }, 500);
    } else {
      mockSearch(searchQuery);
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "YouTube Frontend":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20";
      case "Decentralized":
        return "bg-green-500/10 text-green-500 border-green-500/20";
      case "Alternative Platform":
        return "bg-purple-500/10 text-purple-500 border-purple-500/20";
      default:
        return "bg-gray-500/10 text-gray-500 border-gray-500/20";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-3">
            <h1 className="text-5xl font-bold">Find it on your own!</h1>
                        <Play className="w-12 h-12 text-primary" />

          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-2">
            Search YouTube and alt platforms without tracking, ads, or
            algorithms.
          </p>
          <span className="text-sm text-muted-foreground">
            Inspired by{" "}
            <a
              href="https://tube.cadence.moe/"
              className="underline"
              target="_blank"
            >
              tube.cadence.moe
            </a>
          </span>
        </div>

        {/* Search Bar */}
        <div className="flex flex-col items-center mb-8 ">
          <div className="flex w-full max-w-3xl relative ">
            <Input
              type="text"
              placeholder="i want to watch a video on . . . . . . . . . . . ."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className=" h-18 rounded-full pl-12 pr-24 py-4 text-lg shadow border-2 border-muted focus:border-primary transition-all"
              onKeyDown={(e) => {
                if (e.key === "Enter" && query.trim()) {
                  handleSearch(null, query);
                }
              }}
              disabled={isSearching}
              autoFocus
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-6 h-6" />
            {query && (
              <button
                className="absolute right-20 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary"
                onClick={() => setQuery("")}
                tabIndex={-1}
                aria-label="Clear"
              >
                ×
              </button>
            )}
            <Button
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full px-4 py-2 flex gap-2"
              onClick={() => handleSearch(null, query)}
              disabled={isSearching || !query.trim()}
            >
              <Search className="w-5 h-5" />
              Search
            </Button>
          </div>
          <Button
            variant="ghost"
            className="mt-3 flex items-center gap-2 text-muted-foreground hover:text-primary"
            onClick={handleRandom}
            disabled={isSearching}
          >
            <span role="img" aria-label="dice">
              ?
            </span>{" "}
            Can't think of anything on my own  ?
          </Button>
        </div>

        {/* Show "Can't Think" section if present */}
        {randomVideo && showCantThink && (
          <div className="max-w-2xl mx-auto mb-8 relative">
            <button
              className="absolute top-2 right-2 text-lg text-muted-foreground hover:text-destructive z-10"
              onClick={() => setShowCantThink(false)}
              aria-label="Close Can't Think section"
            >
              ×
            </button>
            <Card className="p-6 flex flex-col gap-4">
              <div className="flex items-center gap-2 mb-2">
                <Play className="w-6 h-6 text-primary" />
                <a
                  href={randomVideo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xl font-bold hover:underline"
                >
                  {randomVideo.title}
                </a>
              </div>
              <audio
                ref={audioRef}
                controls
                src={randomVideo.audioUrl}
                className="w-full mb-2"
                onPlay={handleAudioPlay}
                onPause={handleAudioPause}
              >
                Your browser does not support the audio element.
              </audio>
              <div className="bg-muted rounded p-3 text-sm text-muted-foreground whitespace-pre-line">
                {randomVideo.transcript}
              </div>
              <button
                className="mt-2 text-xs text-muted-foreground hover:text-destructive text-left"
                onClick={() => setShowCantThink(false)}
                aria-label="Close Can't Think section (bottom left)"
              >
                × Close
              </button>
              <div className="mt-2 text-xs text-muted-foreground text-right">
                Source & inspiration:{" "}
                <a
                  href="https://tube.cadence.moe/cant-think"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  tube.cadence.moe/cant-think
                </a>
              </div>
            </Card>
          </div>
        )}

        {/* Search Results */}
        <div className="max-w-2xl mx-auto mb-12">
          {isSearching && (
            <div className="text-center text-muted-foreground py-8 animate-pulse">
              Searching...
            </div>
          )}
          {error && (
            <div className="text-center text-destructive py-8">{error}</div>
          )}
          {!isSearching && !error && results.length > 0 && (
            <div className="space-y-4">
              {results.map((result, idx) => (
                <Card
                  key={idx}
                  className="p-4 flex flex-col md:flex-row items-start gap-4 hover:shadow-lg transition-shadow"
                >
                  <div className="flex-1">
                    <a
                      href={result.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lg font-semibold hover:underline"
                    >
                      {result.title}
                    </a>
                    <div className="text-sm text-muted-foreground mb-1">
                      {result.description}
                    </div>
                    <Badge variant="outline" className="mt-1">
                      {result.platform}
                    </Badge>
                  </div>
                  <Button asChild variant="outline" size="sm">
                    <a
                      href={result.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Play className="w-4 h-4 mr-2" /> Watch
                    </a>
                  </Button>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Platform Comparison */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">
            Why These Platforms?
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {platforms.map((platform) => (
              <Card
                key={platform.name}
                className="p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold">{platform.name}</h3>
                  <Badge
                    variant="outline"
                    className={getTypeColor(platform.type)}
                  >
                    {platform.type}
                  </Badge>
                </div>

                <p className="text-muted-foreground text-sm mb-4">
                  {platform.description}
                </p>

                <div className="space-y-2 mb-4">
                  {platform.features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 text-sm"
                    >
                      <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <Button variant="outline" size="sm" asChild className="w-full">
                  <a
                    href={platform.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Globe className="w-4 h-4 mr-2" />
                    Visit Platform
                  </a>
                </Button>
              </Card>
            ))}
          </div>
        </div>

        {/* Education Section */}
        <Card className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">
              Why Avoid YouTube Directly?
            </h2>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              While YouTube hosts valuable content, the platform extensively
              tracks users, manipulates recommendations, and serves intrusive
              advertisements.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Youtube className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="font-semibold mb-2">Data Collection</h3>
              <p className="text-sm text-muted-foreground">
                Tracks viewing habits, builds behavioral profiles, and shares
                data with advertisers
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-blue-500" />
              </div>
              <h3 className="font-semibold mb-2">Privacy Frontends</h3>
              <p className="text-sm text-muted-foreground">
                Access the same content without tracking, ads, or algorithmic
                manipulation
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-green-500" />
              </div>
              <h3 className="font-semibold mb-2">Decentralized</h3>
              <p className="text-sm text-muted-foreground">
                Support creator-owned platforms that can't be censored or
                controlled
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default VideoSearch;
