import React, { useState, useEffect } from 'react';
import { Trophy, Clock, Users, Award, ChevronRight, Play, Pause, RotateCcw } from 'lucide-react';

// Main App Component
export default function DriftJudgingSystem() {
  const [mode, setMode] = useState('home'); // home, qualifying, battle
  const [drivers, setDrivers] = useState([]);
  const [qualifyingScores, setQualifyingScores] = useState([]);
  const [currentDriverIndex, setCurrentDriverIndex] = useState(0);
  const [bracket, setBracket] = useState([]);
  const [currentBattle, setCurrentBattle] = useState(null);

  // Initialize demo drivers
  useEffect(() => {
    const demoDrivers = Array.from({ length: 32 }, (_, i) => ({
      id: i + 1,
      name: `Driver ${i + 1}`,
      number: `#${String(i + 1).padStart(3, '0')}`
    }));
    setDrivers(demoDrivers);
  }, []);

  const resetSystem = () => {
    setMode('home');
    setQualifyingScores([]);
    setCurrentDriverIndex(0);
    setBracket([]);
    setCurrentBattle(null);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 100%)',
      color: '#ffffff',
      fontFamily: '"Rajdhani", "Orbitron", sans-serif',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background Racing Lines */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        opacity: 0.03,
        background: `repeating-linear-gradient(
          45deg,
          transparent,
          transparent 20px,
          #E31E24 20px,
          #E31E24 21px
        )`
      }} />

      {/* Header */}
      <header style={{
        background: 'linear-gradient(90deg, #000000 0%, #E31E24 100%)',
        padding: '20px 40px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '3px solid #E31E24',
        position: 'relative',
        zIndex: 10
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{
            width: '60px',
            height: '60px',
            background: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            clipPath: 'polygon(0 0, 100% 0, 85% 100%, 0% 100%)',
            fontWeight: 900,
            fontSize: '24px',
            color: '#000000'
          }}>
            RC
          </div>
          <div>
            <h1 style={{ margin: 0, fontSize: '32px', fontWeight: 900, letterSpacing: '2px' }}>
              DRIFT JUDGING SYSTEM
            </h1>
            <p style={{ margin: 0, fontSize: '14px', opacity: 0.8, letterSpacing: '3px' }}>
              POWERED BY TODAK RC
            </p>
          </div>
        </div>
        
        {mode !== 'home' && (
          <button
            onClick={resetSystem}
            style={{
              background: 'transparent',
              border: '2px solid #E31E24',
              color: '#E31E24',
              padding: '12px 24px',
              fontSize: '16px',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              clipPath: 'polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)',
              transition: 'all 0.3s'
            }}
            onMouseOver={(e) => {
              e.target.style.background = '#E31E24';
              e.target.style.color = '#000000';
            }}
            onMouseOut={(e) => {
              e.target.style.background = 'transparent';
              e.target.style.color = '#E31E24';
            }}
          >
            <RotateCcw size={18} />
            RESET
          </button>
        )}
      </header>

      {/* Main Content */}
      <main style={{ position: 'relative', zIndex: 1 }}>
        {mode === 'home' && (
          <HomeScreen setMode={setMode} />
        )}
        
        {mode === 'qualifying' && (
          <QualifyingModule
            drivers={drivers}
            currentDriverIndex={currentDriverIndex}
            setCurrentDriverIndex={setCurrentDriverIndex}
            qualifyingScores={qualifyingScores}
            setQualifyingScores={setQualifyingScores}
            setMode={setMode}
            setBracket={setBracket}
          />
        )}
        
        {mode === 'battle' && (
          <BattleModule
            bracket={bracket}
            setBracket={setBracket}
            currentBattle={currentBattle}
            setCurrentBattle={setCurrentBattle}
          />
        )}
      </main>
    </div>
  );
}

// Home Screen Component
function HomeScreen({ setMode }) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: 'calc(100vh - 120px)',
      padding: '40px',
      gap: '40px'
    }}>
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <h2 style={{
          fontSize: '48px',
          fontWeight: 900,
          margin: 0,
          letterSpacing: '4px',
          textTransform: 'uppercase',
          background: 'linear-gradient(90deg, #ffffff 0%, #E31E24 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          SELECT MODE
        </h2>
        <div style={{
          width: '200px',
          height: '4px',
          background: '#E31E24',
          margin: '20px auto',
          clipPath: 'polygon(0 0, 100% 0, 95% 100%, 5% 100%)'
        }} />
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '30px',
        maxWidth: '900px',
        width: '100%'
      }}>
        <ModeCard
          icon={<Clock size={48} />}
          title="QUALIFYING"
          description="3 Judges Score Individual Runs"
          features={['Angle, Speed, Line, Style', 'Live Leaderboard', 'Top 24/32 Selection']}
          onClick={() => setMode('qualifying')}
          color="#E31E24"
        />
        
        <ModeCard
          icon={<Trophy size={48} />}
          title="BATTLE"
          description="Head-to-Head Elimination Rounds"
          features={['Bracket Tournament', '3 Judge Vote', 'Live Results']}
          onClick={() => setMode('battle')}
          color="#ffffff"
        />
      </div>
    </div>
  );
}

function ModeCard({ icon, title, description, features, onClick, color }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background: isHovered ? 'rgba(227, 30, 36, 0.1)' : 'rgba(255, 255, 255, 0.03)',
        border: `2px solid ${isHovered ? color : 'rgba(255, 255, 255, 0.1)'}`,
        padding: '40px',
        cursor: 'pointer',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        transform: isHovered ? 'translateY(-10px) scale(1.02)' : 'translateY(0) scale(1)',
        clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Hover effect background */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `linear-gradient(135deg, transparent 0%, ${color}15 100%)`,
        opacity: isHovered ? 1 : 0,
        transition: 'opacity 0.4s'
      }} />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ color: color, marginBottom: '20px' }}>
          {icon}
        </div>
        
        <h3 style={{
          fontSize: '28px',
          fontWeight: 900,
          margin: '0 0 10px 0',
          letterSpacing: '2px',
          color: color
        }}>
          {title}
        </h3>
        
        <p style={{
          fontSize: '16px',
          opacity: 0.8,
          marginBottom: '24px',
          lineHeight: 1.6
        }}>
          {description}
        </p>
        
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {features.map((feature, i) => (
            <li key={i} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '12px',
              fontSize: '14px',
              opacity: 0.9
            }}>
              <ChevronRight size={16} color={color} />
              {feature}
            </li>
          ))}
        </ul>

        <div style={{
          marginTop: '30px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '16px',
          fontWeight: 700,
          color: color,
          opacity: isHovered ? 1 : 0.6,
          transition: 'opacity 0.3s'
        }}>
          START <ChevronRight size={20} />
        </div>
      </div>
    </div>
  );
}

// Qualifying Module
function QualifyingModule({ 
  drivers, 
  currentDriverIndex, 
  setCurrentDriverIndex,
  qualifyingScores,
  setQualifyingScores,
  setMode,
  setBracket 
}) {
  const currentDriver = drivers[currentDriverIndex];
  const [judgeScores, setJudgeScores] = useState({
    judge1: { angle: 0, speed: 0, line: 0, style: 0 },
    judge2: { angle: 0, speed: 0, line: 0, style: 0 },
    judge3: { angle: 0, speed: 0, line: 0, style: 0 }
  });
  const [timer, setTimer] = useState(120); // 2 minutes
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (isRunning && timer > 0) {
      interval = setInterval(() => {
        setTimer(t => t - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsRunning(false);
    }
    return () => clearInterval(interval);
  }, [isRunning, timer]);

  const calculateTotal = (scores) => {
    return scores.angle + scores.speed + scores.line + scores.style;
  };

  const calculateAverage = () => {
    const total1 = calculateTotal(judgeScores.judge1);
    const total2 = calculateTotal(judgeScores.judge2);
    const total3 = calculateTotal(judgeScores.judge3);
    return ((total1 + total2 + total3) / 3).toFixed(1);
  };

  const submitScores = () => {
    const avg = parseFloat(calculateAverage());
    const newScore = {
      driver: currentDriver,
      average: avg,
      judge1Total: calculateTotal(judgeScores.judge1),
      judge2Total: calculateTotal(judgeScores.judge2),
      judge3Total: calculateTotal(judgeScores.judge3),
      judgeScores: { ...judgeScores }
    };

    setQualifyingScores([...qualifyingScores, newScore]);
    
    // Reset for next driver
    if (currentDriverIndex < drivers.length - 1) {
      setCurrentDriverIndex(currentDriverIndex + 1);
      setJudgeScores({
        judge1: { angle: 0, speed: 0, line: 0, style: 0 },
        judge2: { angle: 0, speed: 0, line: 0, style: 0 },
        judge3: { angle: 0, speed: 0, line: 0, style: 0 }
      });
      setTimer(120);
      setIsRunning(false);
    }
  };

  const finishQualifying = () => {
    const sorted = [...qualifyingScores].sort((a, b) => b.average - a.average);
    const top24 = sorted.slice(0, 24);
    
    // Generate bracket (seeding: 1 vs 24, 2 vs 23, etc.)
    const initialBracket = [];
    for (let i = 0; i < 12; i++) {
      initialBracket.push({
        id: i,
        driver1: top24[i],
        driver2: top24[23 - i],
        winner: null,
        round: 1
      });
    }
    
    setBracket(initialBracket);
    setMode('battle');
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <div style={{ padding: '40px' }}>
      <div style={{ maxWidth: '1600px', margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr',
          gap: '30px',
          marginBottom: '30px'
        }}>
          {/* Scoring Panel */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '2px solid rgba(227, 30, 36, 0.3)',
            padding: '30px',
            clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%)'
          }}>
            {/* Current Driver Info */}
            <div style={{
              background: 'linear-gradient(90deg, #E31E24 0%, transparent 100%)',
              padding: '20px',
              marginBottom: '30px',
              clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 0 100%)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: '14px', opacity: 0.8, marginBottom: '5px' }}>
                    CURRENTLY JUDGING
                  </div>
                  <div style={{ fontSize: '32px', fontWeight: 900, letterSpacing: '2px' }}>
                    {currentDriver?.name || 'N/A'}
                  </div>
                  <div style={{ fontSize: '18px', opacity: 0.9 }}>
                    {currentDriver?.number || 'N/A'}
                  </div>
                </div>
                
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '48px', fontWeight: 900, color: timer < 30 ? '#E31E24' : '#ffffff' }}>
                    {formatTime(timer)}
                  </div>
                  <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                    <button
                      onClick={() => setIsRunning(!isRunning)}
                      style={{
                        background: isRunning ? '#E31E24' : '#ffffff',
                        color: isRunning ? '#000000' : '#000000',
                        border: 'none',
                        padding: '10px 20px',
                        cursor: 'pointer',
                        fontWeight: 700,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}
                    >
                      {isRunning ? <><Pause size={16} /> PAUSE</> : <><Play size={16} /> START</>}
                    </button>
                    <button
                      onClick={() => setTimer(120)}
                      style={{
                        background: 'transparent',
                        color: '#ffffff',
                        border: '2px solid #ffffff',
                        padding: '10px 20px',
                        cursor: 'pointer',
                        fontWeight: 700
                      }}
                    >
                      RESET
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Judge Scoring Grid */}
            <div style={{ display: 'grid', gap: '20px' }}>
              {['judge1', 'judge2', 'judge3'].map((judge, idx) => (
                <JudgePanel
                  key={judge}
                  judgeNumber={idx + 1}
                  scores={judgeScores[judge]}
                  setScores={(newScores) => setJudgeScores({
                    ...judgeScores,
                    [judge]: newScores
                  })}
                />
              ))}
            </div>

            {/* Average & Submit */}
            <div style={{
              marginTop: '30px',
              padding: '20px',
              background: 'rgba(227, 30, 36, 0.1)',
              border: '2px solid #E31E24',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <div style={{ fontSize: '14px', opacity: 0.8 }}>AVERAGE SCORE</div>
                <div style={{ fontSize: '48px', fontWeight: 900, color: '#E31E24' }}>
                  {calculateAverage()}/40
                </div>
              </div>
              
              <button
                onClick={submitScores}
                disabled={calculateAverage() === '0.0'}
                style={{
                  background: calculateAverage() === '0.0' ? '#666' : '#E31E24',
                  color: '#000000',
                  border: 'none',
                  padding: '20px 40px',
                  fontSize: '18px',
                  fontWeight: 900,
                  cursor: calculateAverage() === '0.0' ? 'not-allowed' : 'pointer',
                  clipPath: 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)',
                  letterSpacing: '2px'
                }}
              >
                SUBMIT SCORES
              </button>
            </div>
          </div>

          {/* Leaderboard */}
          <Leaderboard scores={qualifyingScores} />
        </div>

        {/* Finish Qualifying Button */}
        {qualifyingScores.length >= 24 && (
          <div style={{ textAlign: 'center', marginTop: '30px' }}>
            <button
              onClick={finishQualifying}
              style={{
                background: '#ffffff',
                color: '#000000',
                border: 'none',
                padding: '20px 60px',
                fontSize: '24px',
                fontWeight: 900,
                cursor: 'pointer',
                clipPath: 'polygon(15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%, 0 15px)',
                letterSpacing: '3px',
                boxShadow: '0 10px 30px rgba(227, 30, 36, 0.5)'
              }}
            >
              FINISH QUALIFYING → START BATTLE
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function JudgePanel({ judgeNumber, scores, setScores }) {
  const categories = ['angle', 'speed', 'line', 'style'];
  const total = scores.angle + scores.speed + scores.line + scores.style;

  return (
    <div style={{
      background: 'rgba(255, 255, 255, 0.05)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      padding: '20px'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '15px'
      }}>
        <div style={{ fontSize: '18px', fontWeight: 700, letterSpacing: '1px' }}>
          JUDGE {judgeNumber}
        </div>
        <div style={{ fontSize: '24px', fontWeight: 900, color: '#E31E24' }}>
          {total}/40
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
        {categories.map(cat => (
          <div key={cat}>
            <div style={{
              fontSize: '12px',
              opacity: 0.7,
              marginBottom: '8px',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>
              {cat}
            </div>
            <input
              type="number"
              min="0"
              max="10"
              value={scores[cat]}
              onChange={(e) => {
                const val = Math.min(10, Math.max(0, parseInt(e.target.value) || 0));
                setScores({ ...scores, [cat]: val });
              }}
              style={{
                width: '100%',
                padding: '12px',
                fontSize: '20px',
                fontWeight: 900,
                textAlign: 'center',
                background: 'rgba(0, 0, 0, 0.5)',
                border: '2px solid rgba(227, 30, 36, 0.3)',
                color: '#ffffff',
                fontFamily: 'inherit'
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function Leaderboard({ scores }) {
  const sorted = [...scores].sort((a, b) => b.average - a.average);

  return (
    <div style={{
      background: 'rgba(255, 255, 255, 0.03)',
      border: '2px solid rgba(255, 255, 255, 0.1)',
      padding: '30px',
      clipPath: 'polygon(20px 0, 100% 0, 100% 100%, 0 100%, 0 20px)',
      maxHeight: '800px',
      overflow: 'auto'
    }}>
      <div style={{
        fontSize: '24px',
        fontWeight: 900,
        marginBottom: '20px',
        letterSpacing: '2px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
      }}>
        <Award size={24} color="#E31E24" />
        LEADERBOARD
      </div>

      {sorted.length === 0 ? (
        <div style={{ textAlign: 'center', opacity: 0.5, padding: '40px' }}>
          No scores yet
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {sorted.map((score, idx) => (
            <div
              key={idx}
              style={{
                display: 'grid',
                gridTemplateColumns: '40px 1fr 60px',
                gap: '15px',
                alignItems: 'center',
                padding: '15px',
                background: idx < 24 ? 'rgba(227, 30, 36, 0.1)' : 'rgba(255, 255, 255, 0.03)',
                border: idx < 3 ? '2px solid #E31E24' : '1px solid rgba(255, 255, 255, 0.1)',
                animation: 'slideIn 0.3s ease-out',
                animationDelay: `${idx * 0.05}s`,
                animationFillMode: 'both'
              }}
            >
              <div style={{
                fontSize: '24px',
                fontWeight: 900,
                color: idx === 0 ? '#FFD700' : idx === 1 ? '#C0C0C0' : idx === 2 ? '#CD7F32' : '#E31E24'
              }}>
                {idx + 1}
              </div>
              
              <div>
                <div style={{ fontSize: '16px', fontWeight: 700 }}>
                  {score.driver.name}
                </div>
                <div style={{ fontSize: '12px', opacity: 0.7 }}>
                  {score.driver.number}
                </div>
              </div>

              <div style={{
                fontSize: '20px',
                fontWeight: 900,
                textAlign: 'right',
                color: '#ffffff'
              }}>
                {score.average}
              </div>
            </div>
          ))}
        </div>
      )}

      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
}

// Battle Module
function BattleModule({ bracket, setBracket, currentBattle, setCurrentBattle }) {
  const [judgeVotes, setJudgeVotes] = useState({ judge1: null, judge2: null, judge3: null });

  useEffect(() => {
    // Set first unresolved battle as current
    if (!currentBattle && bracket.length > 0) {
      const firstUnresolved = bracket.find(b => !b.winner);
      if (firstUnresolved) {
        setCurrentBattle(firstUnresolved);
      }
    }
  }, [bracket, currentBattle]);

  const submitVotes = () => {
    const votes = Object.values(judgeVotes);
    const driver1Votes = votes.filter(v => v === 'driver1').length;
    const driver2Votes = votes.filter(v => v === 'driver2').length;
    
    const winner = driver1Votes > driver2Votes ? currentBattle.driver1 : currentBattle.driver2;
    
    // Update bracket
    const updatedBracket = bracket.map(b => 
      b.id === currentBattle.id ? { ...b, winner, votes: { driver1Votes, driver2Votes } } : b
    );
    
    setBracket(updatedBracket);
    setJudgeVotes({ judge1: null, judge2: null, judge3: null });
    
    // Move to next battle
    const nextBattle = updatedBracket.find(b => !b.winner);
    setCurrentBattle(nextBattle || null);
  };

  const unresolvedBattles = bracket.filter(b => !b.winner);
  const resolvedBattles = bracket.filter(b => b.winner);

  return (
    <div style={{ padding: '40px' }}>
      <div style={{ maxWidth: '1600px', margin: '0 auto' }}>
        {currentBattle ? (
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '30px' }}>
            {/* Current Battle */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.03)',
              border: '2px solid rgba(227, 30, 36, 0.3)',
              padding: '40px',
              clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 30px), calc(100% - 30px) 100%, 0 100%)'
            }}>
              <div style={{
                fontSize: '14px',
                opacity: 0.8,
                marginBottom: '10px',
                letterSpacing: '2px'
              }}>
                ROUND {currentBattle.round} - BATTLE {bracket.indexOf(currentBattle) + 1}
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr auto 1fr',
                gap: '30px',
                alignItems: 'center',
                marginBottom: '40px'
              }}>
                <DriverCard driver={currentBattle.driver1} side="left" />
                
                <div style={{
                  fontSize: '48px',
                  fontWeight: 900,
                  color: '#E31E24'
                }}>
                  VS
                </div>

                <DriverCard driver={currentBattle.driver2} side="right" />
              </div>

              {/* Judge Voting */}
              <div style={{
                background: 'rgba(0, 0, 0, 0.5)',
                padding: '30px',
                border: '2px solid rgba(227, 30, 36, 0.3)'
              }}>
                <div style={{
                  fontSize: '20px',
                  fontWeight: 700,
                  marginBottom: '20px',
                  letterSpacing: '2px'
                }}>
                  JUDGE VOTES
                </div>

                <div style={{ display: 'grid', gap: '15px' }}>
                  {['judge1', 'judge2', 'judge3'].map((judge, idx) => (
                    <div key={judge} style={{
                      display: 'grid',
                      gridTemplateColumns: '100px 1fr 1fr',
                      gap: '15px',
                      alignItems: 'center'
                    }}>
                      <div style={{ fontWeight: 700 }}>JUDGE {idx + 1}</div>
                      
                      <button
                        onClick={() => setJudgeVotes({ ...judgeVotes, [judge]: 'driver1' })}
                        style={{
                          padding: '15px',
                          background: judgeVotes[judge] === 'driver1' ? '#E31E24' : 'rgba(255, 255, 255, 0.1)',
                          color: judgeVotes[judge] === 'driver1' ? '#000000' : '#ffffff',
                          border: judgeVotes[judge] === 'driver1' ? '2px solid #ffffff' : '2px solid rgba(255, 255, 255, 0.2)',
                          cursor: 'pointer',
                          fontWeight: 700,
                          fontSize: '14px'
                        }}
                      >
                        {currentBattle.driver1.driver.name}
                      </button>

                      <button
                        onClick={() => setJudgeVotes({ ...judgeVotes, [judge]: 'driver2' })}
                        style={{
                          padding: '15px',
                          background: judgeVotes[judge] === 'driver2' ? '#E31E24' : 'rgba(255, 255, 255, 0.1)',
                          color: judgeVotes[judge] === 'driver2' ? '#000000' : '#ffffff',
                          border: judgeVotes[judge] === 'driver2' ? '2px solid #ffffff' : '2px solid rgba(255, 255, 255, 0.2)',
                          cursor: 'pointer',
                          fontWeight: 700,
                          fontSize: '14px'
                        }}
                      >
                        {currentBattle.driver2.driver.name}
                      </button>
                    </div>
                  ))}
                </div>

                <button
                  onClick={submitVotes}
                  disabled={Object.values(judgeVotes).some(v => v === null)}
                  style={{
                    marginTop: '30px',
                    width: '100%',
                    padding: '20px',
                    background: Object.values(judgeVotes).some(v => v === null) ? '#666' : '#E31E24',
                    color: '#000000',
                    border: 'none',
                    fontSize: '18px',
                    fontWeight: 900,
                    cursor: Object.values(judgeVotes).some(v => v === null) ? 'not-allowed' : 'pointer',
                    letterSpacing: '2px'
                  }}
                >
                  SUBMIT VOTES & NEXT BATTLE
                </button>
              </div>
            </div>

            {/* Battle Progress */}
            <div>
              <div style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '2px solid rgba(255, 255, 255, 0.1)',
                padding: '20px',
                marginBottom: '20px'
              }}>
                <div style={{ fontSize: '18px', fontWeight: 700, marginBottom: '15px' }}>
                  PROGRESS
                </div>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <div style={{
                    flex: 1,
                    height: '30px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    position: 'relative',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      height: '100%',
                      width: `${(resolvedBattles.length / bracket.length) * 100}%`,
                      background: 'linear-gradient(90deg, #E31E24 0%, #ffffff 100%)',
                      transition: 'width 0.5s'
                    }} />
                  </div>
                  <div style={{ fontSize: '20px', fontWeight: 900 }}>
                    {resolvedBattles.length}/{bracket.length}
                  </div>
                </div>
              </div>

              <div style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '2px solid rgba(255, 255, 255, 0.1)',
                padding: '20px'
              }}>
                <div style={{ fontSize: '18px', fontWeight: 700, marginBottom: '15px' }}>
                  UPCOMING BATTLES
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {unresolvedBattles.slice(0, 5).map((battle, idx) => (
                    <div
                      key={battle.id}
                      style={{
                        padding: '10px',
                        background: battle.id === currentBattle.id ? 'rgba(227, 30, 36, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                        border: battle.id === currentBattle.id ? '2px solid #E31E24' : '1px solid rgba(255, 255, 255, 0.1)',
                        fontSize: '14px'
                      }}
                    >
                      <div style={{ fontWeight: 700, marginBottom: '5px' }}>
                        {battle.driver1.driver.name}
                      </div>
                      <div style={{ opacity: 0.7, fontSize: '12px' }}>vs</div>
                      <div style={{ fontWeight: 700, marginTop: '5px' }}>
                        {battle.driver2.driver.name}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '100px' }}>
            <Trophy size={80} color="#E31E24" style={{ marginBottom: '30px' }} />
            <h2 style={{ fontSize: '48px', fontWeight: 900, marginBottom: '20px' }}>
              TOURNAMENT COMPLETE!
            </h2>
            <div style={{ fontSize: '24px', opacity: 0.8 }}>
              All battles have been resolved
            </div>
            
            {resolvedBattles.length > 0 && (
              <div style={{ marginTop: '50px' }}>
                <div style={{ fontSize: '20px', fontWeight: 700, marginBottom: '20px' }}>
                  FINAL RESULTS
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '600px', margin: '0 auto' }}>
                  {resolvedBattles.map((battle, idx) => (
                    <div
                      key={battle.id}
                      style={{
                        padding: '15px',
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}
                    >
                      <div>
                        <div style={{ fontSize: '12px', opacity: 0.7, marginBottom: '5px' }}>
                          BATTLE {idx + 1}
                        </div>
                        <div style={{ fontWeight: 700 }}>
                          {battle.winner.driver.name}
                        </div>
                      </div>
                      <div style={{ fontSize: '14px', opacity: 0.8 }}>
                        {battle.votes?.driver1Votes || 0} - {battle.votes?.driver2Votes || 0}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function DriverCard({ driver, side }) {
  return (
    <div style={{
      background: 'rgba(227, 30, 36, 0.1)',
      border: '2px solid #E31E24',
      padding: '30px',
      textAlign: side === 'left' ? 'left' : 'right',
      clipPath: side === 'left' 
        ? 'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 0 100%)'
        : 'polygon(20px 0, 100% 0, 100% 100%, 0 100%, 0 20px)'
    }}>
      <div style={{ fontSize: '14px', opacity: 0.7, marginBottom: '5px' }}>
        RANK #{driver.driver.id} • QUALIFYING: {driver.average}
      </div>
      <div style={{ fontSize: '28px', fontWeight: 900, marginBottom: '5px' }}>
        {driver.driver.name}
      </div>
      <div style={{ fontSize: '18px', opacity: 0.9 }}>
        {driver.driver.number}
      </div>
    </div>
  );
}
import React, { useState, useEffect } from 'react';
import { Trophy, Clock, Users, Award, ChevronRight, Play, Pause, RotateCcw } from 'lucide-react';

// Main App Component
export default function DriftJudgingSystem() {
  const [mode, setMode] = useState('home'); // home, qualifying, battle
  const [drivers, setDrivers] = useState([]);
  const [qualifyingScores, setQualifyingScores] = useState([]);
  const [currentDriverIndex, setCurrentDriverIndex] = useState(0);
  const [bracket, setBracket] = useState([]);
  const [currentBattle, setCurrentBattle] = useState(null);

  // Initialize demo drivers
  useEffect(() => {
    const demoDrivers = Array.from({ length: 32 }, (_, i) => ({
      id: i + 1,
      name: `Driver ${i + 1}`,
      number: `#${String(i + 1).padStart(3, '0')}`
    }));
    setDrivers(demoDrivers);
  }, []);

  const resetSystem = () => {
    setMode('home');
    setQualifyingScores([]);
    setCurrentDriverIndex(0);
    setBracket([]);
    setCurrentBattle(null);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 100%)',
      color: '#ffffff',
      fontFamily: '"Rajdhani", "Orbitron", sans-serif',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background Racing Lines */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        opacity: 0.03,
        background: `repeating-linear-gradient(
          45deg,
          transparent,
          transparent 20px,
          #E31E24 20px,
          #E31E24 21px
        )`
      }} />

      {/* Header */}
      <header style={{
        background: 'linear-gradient(90deg, #000000 0%, #E31E24 100%)',
        padding: '20px 40px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '3px solid #E31E24',
        position: 'relative',
        zIndex: 10
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{
            width: '60px',
            height: '60px',
            background: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            clipPath: 'polygon(0 0, 100% 0, 85% 100%, 0% 100%)',
            fontWeight: 900,
            fontSize: '24px',
            color: '#000000'
          }}>
            RC
          </div>
          <div>
            <h1 style={{ margin: 0, fontSize: '32px', fontWeight: 900, letterSpacing: '2px' }}>
              DRIFT JUDGING SYSTEM
            </h1>
            <p style={{ margin: 0, fontSize: '14px', opacity: 0.8, letterSpacing: '3px' }}>
              POWERED BY TODAK RC
            </p>
          </div>
        </div>
        
        {mode !== 'home' && (
          <button
            onClick={resetSystem}
            style={{
              background: 'transparent',
              border: '2px solid #E31E24',
              color: '#E31E24',
              padding: '12px 24px',
              fontSize: '16px',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              clipPath: 'polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)',
              transition: 'all 0.3s'
            }}
            onMouseOver={(e) => {
              e.target.style.background = '#E31E24';
              e.target.style.color = '#000000';
            }}
            onMouseOut={(e) => {
              e.target.style.background = 'transparent';
              e.target.style.color = '#E31E24';
            }}
          >
            <RotateCcw size={18} />
            RESET
          </button>
        )}
      </header>

      {/* Main Content */}
      <main style={{ position: 'relative', zIndex: 1 }}>
        {mode === 'home' && (
          <HomeScreen setMode={setMode} />
        )}
        
        {mode === 'qualifying' && (
          <QualifyingModule
            drivers={drivers}
            currentDriverIndex={currentDriverIndex}
            setCurrentDriverIndex={setCurrentDriverIndex}
            qualifyingScores={qualifyingScores}
            setQualifyingScores={setQualifyingScores}
            setMode={setMode}
            setBracket={setBracket}
          />
        )}
        
        {mode === 'battle' && (
          <BattleModule
            bracket={bracket}
            setBracket={setBracket}
            currentBattle={currentBattle}
            setCurrentBattle={setCurrentBattle}
          />
        )}
      </main>
    </div>
  );
}

// Home Screen Component
function HomeScreen({ setMode }) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: 'calc(100vh - 120px)',
      padding: '40px',
      gap: '40px'
    }}>
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <h2 style={{
          fontSize: '48px',
          fontWeight: 900,
          margin: 0,
          letterSpacing: '4px',
          textTransform: 'uppercase',
          background: 'linear-gradient(90deg, #ffffff 0%, #E31E24 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          SELECT MODE
        </h2>
        <div style={{
          width: '200px',
          height: '4px',
          background: '#E31E24',
          margin: '20px auto',
          clipPath: 'polygon(0 0, 100% 0, 95% 100%, 5% 100%)'
        }} />
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '30px',
        maxWidth: '900px',
        width: '100%'
      }}>
        <ModeCard
          icon={<Clock size={48} />}
          title="QUALIFYING"
          description="3 Judges Score Individual Runs"
          features={['Angle, Speed, Line, Style', 'Live Leaderboard', 'Top 24/32 Selection']}
          onClick={() => setMode('qualifying')}
          color="#E31E24"
        />
        
        <ModeCard
          icon={<Trophy size={48} />}
          title="BATTLE"
          description="Head-to-Head Elimination Rounds"
          features={['Bracket Tournament', '3 Judge Vote', 'Live Results']}
          onClick={() => setMode('battle')}
          color="#ffffff"
        />
      </div>
    </div>
  );
}

function ModeCard({ icon, title, description, features, onClick, color }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background: isHovered ? 'rgba(227, 30, 36, 0.1)' : 'rgba(255, 255, 255, 0.03)',
        border: `2px solid ${isHovered ? color : 'rgba(255, 255, 255, 0.1)'}`,
        padding: '40px',
        cursor: 'pointer',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        transform: isHovered ? 'translateY(-10px) scale(1.02)' : 'translateY(0) scale(1)',
        clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Hover effect background */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `linear-gradient(135deg, transparent 0%, ${color}15 100%)`,
        opacity: isHovered ? 1 : 0,
        transition: 'opacity 0.4s'
      }} />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ color: color, marginBottom: '20px' }}>
          {icon}
        </div>
        
        <h3 style={{
          fontSize: '28px',
          fontWeight: 900,
          margin: '0 0 10px 0',
          letterSpacing: '2px',
          color: color
        }}>
          {title}
        </h3>
        
        <p style={{
          fontSize: '16px',
          opacity: 0.8,
          marginBottom: '24px',
          lineHeight: 1.6
        }}>
          {description}
        </p>
        
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {features.map((feature, i) => (
            <li key={i} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '12px',
              fontSize: '14px',
              opacity: 0.9
            }}>
              <ChevronRight size={16} color={color} />
              {feature}
            </li>
          ))}
        </ul>

        <div style={{
          marginTop: '30px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '16px',
          fontWeight: 700,
          color: color,
          opacity: isHovered ? 1 : 0.6,
          transition: 'opacity 0.3s'
        }}>
          START <ChevronRight size={20} />
        </div>
      </div>
    </div>
  );
}

// Qualifying Module
function QualifyingModule({ 
  drivers, 
  currentDriverIndex, 
  setCurrentDriverIndex,
  qualifyingScores,
  setQualifyingScores,
  setMode,
  setBracket 
}) {
  const currentDriver = drivers[currentDriverIndex];
  const [judgeScores, setJudgeScores] = useState({
    judge1: { angle: 0, speed: 0, line: 0, style: 0 },
    judge2: { angle: 0, speed: 0, line: 0, style: 0 },
    judge3: { angle: 0, speed: 0, line: 0, style: 0 }
  });
  const [timer, setTimer] = useState(120); // 2 minutes
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (isRunning && timer > 0) {
      interval = setInterval(() => {
        setTimer(t => t - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsRunning(false);
    }
    return () => clearInterval(interval);
  }, [isRunning, timer]);

  const calculateTotal = (scores) => {
    return scores.angle + scores.speed + scores.line + scores.style;
  };

  const calculateAverage = () => {
    const total1 = calculateTotal(judgeScores.judge1);
    const total2 = calculateTotal(judgeScores.judge2);
    const total3 = calculateTotal(judgeScores.judge3);
    return ((total1 + total2 + total3) / 3).toFixed(1);
  };

  const submitScores = () => {
    const avg = parseFloat(calculateAverage());
    const newScore = {
      driver: currentDriver,
      average: avg,
      judge1Total: calculateTotal(judgeScores.judge1),
      judge2Total: calculateTotal(judgeScores.judge2),
      judge3Total: calculateTotal(judgeScores.judge3),
      judgeScores: { ...judgeScores }
    };

    setQualifyingScores([...qualifyingScores, newScore]);
    
    // Reset for next driver
    if (currentDriverIndex < drivers.length - 1) {
      setCurrentDriverIndex(currentDriverIndex + 1);
      setJudgeScores({
        judge1: { angle: 0, speed: 0, line: 0, style: 0 },
        judge2: { angle: 0, speed: 0, line: 0, style: 0 },
        judge3: { angle: 0, speed: 0, line: 0, style: 0 }
      });
      setTimer(120);
      setIsRunning(false);
    }
  };

  const finishQualifying = () => {
    const sorted = [...qualifyingScores].sort((a, b) => b.average - a.average);
    const top24 = sorted.slice(0, 24);
    
    // Generate bracket (seeding: 1 vs 24, 2 vs 23, etc.)
    const initialBracket = [];
    for (let i = 0; i < 12; i++) {
      initialBracket.push({
        id: i,
        driver1: top24[i],
        driver2: top24[23 - i],
        winner: null,
        round: 1
      });
    }
    
    setBracket(initialBracket);
    setMode('battle');
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <div style={{ padding: '40px' }}>
      <div style={{ maxWidth: '1600px', margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr',
          gap: '30px',
          marginBottom: '30px'
        }}>
          {/* Scoring Panel */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '2px solid rgba(227, 30, 36, 0.3)',
            padding: '30px',
            clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%)'
          }}>
            {/* Current Driver Info */}
            <div style={{
              background: 'linear-gradient(90deg, #E31E24 0%, transparent 100%)',
              padding: '20px',
              marginBottom: '30px',
              clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 0 100%)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: '14px', opacity: 0.8, marginBottom: '5px' }}>
                    CURRENTLY JUDGING
                  </div>
                  <div style={{ fontSize: '32px', fontWeight: 900, letterSpacing: '2px' }}>
                    {currentDriver?.name || 'N/A'}
                  </div>
                  <div style={{ fontSize: '18px', opacity: 0.9 }}>
                    {currentDriver?.number || 'N/A'}
                  </div>
                </div>
                
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '48px', fontWeight: 900, color: timer < 30 ? '#E31E24' : '#ffffff' }}>
                    {formatTime(timer)}
                  </div>
                  <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                    <button
                      onClick={() => setIsRunning(!isRunning)}
                      style={{
                        background: isRunning ? '#E31E24' : '#ffffff',
                        color: isRunning ? '#000000' : '#000000',
                        border: 'none',
                        padding: '10px 20px',
                        cursor: 'pointer',
                        fontWeight: 700,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}
                    >
                      {isRunning ? <><Pause size={16} /> PAUSE</> : <><Play size={16} /> START</>}
                    </button>
                    <button
                      onClick={() => setTimer(120)}
                      style={{
                        background: 'transparent',
                        color: '#ffffff',
                        border: '2px solid #ffffff',
                        padding: '10px 20px',
                        cursor: 'pointer',
                        fontWeight: 700
                      }}
                    >
                      RESET
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Judge Scoring Grid */}
            <div style={{ display: 'grid', gap: '20px' }}>
              {['judge1', 'judge2', 'judge3'].map((judge, idx) => (
                <JudgePanel
                  key={judge}
                  judgeNumber={idx + 1}
                  scores={judgeScores[judge]}
                  setScores={(newScores) => setJudgeScores({
                    ...judgeScores,
                    [judge]: newScores
                  })}
                />
              ))}
            </div>

            {/* Average & Submit */}
            <div style={{
              marginTop: '30px',
              padding: '20px',
              background: 'rgba(227, 30, 36, 0.1)',
              border: '2px solid #E31E24',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <div style={{ fontSize: '14px', opacity: 0.8 }}>AVERAGE SCORE</div>
                <div style={{ fontSize: '48px', fontWeight: 900, color: '#E31E24' }}>
                  {calculateAverage()}/40
                </div>
              </div>
              
              <button
                onClick={submitScores}
                disabled={calculateAverage() === '0.0'}
                style={{
                  background: calculateAverage() === '0.0' ? '#666' : '#E31E24',
                  color: '#000000',
                  border: 'none',
                  padding: '20px 40px',
                  fontSize: '18px',
                  fontWeight: 900,
                  cursor: calculateAverage() === '0.0' ? 'not-allowed' : 'pointer',
                  clipPath: 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)',
                  letterSpacing: '2px'
                }}
              >
                SUBMIT SCORES
              </button>
            </div>
          </div>

          {/* Leaderboard */}
          <Leaderboard scores={qualifyingScores} />
        </div>

        {/* Finish Qualifying Button */}
        {qualifyingScores.length >= 24 && (
          <div style={{ textAlign: 'center', marginTop: '30px' }}>
            <button
              onClick={finishQualifying}
              style={{
                background: '#ffffff',
                color: '#000000',
                border: 'none',
                padding: '20px 60px',
                fontSize: '24px',
                fontWeight: 900,
                cursor: 'pointer',
                clipPath: 'polygon(15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%, 0 15px)',
                letterSpacing: '3px',
                boxShadow: '0 10px 30px rgba(227, 30, 36, 0.5)'
              }}
            >
              FINISH QUALIFYING → START BATTLE
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function JudgePanel({ judgeNumber, scores, setScores }) {
  const categories = ['angle', 'speed', 'line', 'style'];
  const total = scores.angle + scores.speed + scores.line + scores.style;

  return (
    <div style={{
      background: 'rgba(255, 255, 255, 0.05)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      padding: '20px'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '15px'
      }}>
        <div style={{ fontSize: '18px', fontWeight: 700, letterSpacing: '1px' }}>
          JUDGE {judgeNumber}
        </div>
        <div style={{ fontSize: '24px', fontWeight: 900, color: '#E31E24' }}>
          {total}/40
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
        {categories.map(cat => (
          <div key={cat}>
            <div style={{
              fontSize: '12px',
              opacity: 0.7,
              marginBottom: '8px',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>
              {cat}
            </div>
            <input
              type="number"
              min="0"
              max="10"
              value={scores[cat]}
              onChange={(e) => {
                const val = Math.min(10, Math.max(0, parseInt(e.target.value) || 0));
                setScores({ ...scores, [cat]: val });
              }}
              style={{
                width: '100%',
                padding: '12px',
                fontSize: '20px',
                fontWeight: 900,
                textAlign: 'center',
                background: 'rgba(0, 0, 0, 0.5)',
                border: '2px solid rgba(227, 30, 36, 0.3)',
                color: '#ffffff',
                fontFamily: 'inherit'
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function Leaderboard({ scores }) {
  const sorted = [...scores].sort((a, b) => b.average - a.average);

  return (
    <div style={{
      background: 'rgba(255, 255, 255, 0.03)',
      border: '2px solid rgba(255, 255, 255, 0.1)',
      padding: '30px',
      clipPath: 'polygon(20px 0, 100% 0, 100% 100%, 0 100%, 0 20px)',
      maxHeight: '800px',
      overflow: 'auto'
    }}>
      <div style={{
        fontSize: '24px',
        fontWeight: 900,
        marginBottom: '20px',
        letterSpacing: '2px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
      }}>
        <Award size={24} color="#E31E24" />
        LEADERBOARD
      </div>

      {sorted.length === 0 ? (
        <div style={{ textAlign: 'center', opacity: 0.5, padding: '40px' }}>
          No scores yet
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {sorted.map((score, idx) => (
            <div
              key={idx}
              style={{
                display: 'grid',
                gridTemplateColumns: '40px 1fr 60px',
                gap: '15px',
                alignItems: 'center',
                padding: '15px',
                background: idx < 24 ? 'rgba(227, 30, 36, 0.1)' : 'rgba(255, 255, 255, 0.03)',
                border: idx < 3 ? '2px solid #E31E24' : '1px solid rgba(255, 255, 255, 0.1)',
                animation: 'slideIn 0.3s ease-out',
                animationDelay: `${idx * 0.05}s`,
                animationFillMode: 'both'
              }}
            >
              <div style={{
                fontSize: '24px',
                fontWeight: 900,
                color: idx === 0 ? '#FFD700' : idx === 1 ? '#C0C0C0' : idx === 2 ? '#CD7F32' : '#E31E24'
              }}>
                {idx + 1}
              </div>
              
              <div>
                <div style={{ fontSize: '16px', fontWeight: 700 }}>
                  {score.driver.name}
                </div>
                <div style={{ fontSize: '12px', opacity: 0.7 }}>
                  {score.driver.number}
                </div>
              </div>

              <div style={{
                fontSize: '20px',
                fontWeight: 900,
                textAlign: 'right',
                color: '#ffffff'
              }}>
                {score.average}
              </div>
            </div>
          ))}
        </div>
      )}

      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
}

// Battle Module
function BattleModule({ bracket, setBracket, currentBattle, setCurrentBattle }) {
  const [judgeVotes, setJudgeVotes] = useState({ judge1: null, judge2: null, judge3: null });

  useEffect(() => {
    // Set first unresolved battle as current
    if (!currentBattle && bracket.length > 0) {
      const firstUnresolved = bracket.find(b => !b.winner);
      if (firstUnresolved) {
        setCurrentBattle(firstUnresolved);
      }
    }
  }, [bracket, currentBattle]);

  const submitVotes = () => {
    const votes = Object.values(judgeVotes);
    const driver1Votes = votes.filter(v => v === 'driver1').length;
    const driver2Votes = votes.filter(v => v === 'driver2').length;
    
    const winner = driver1Votes > driver2Votes ? currentBattle.driver1 : currentBattle.driver2;
    
    // Update bracket
    const updatedBracket = bracket.map(b => 
      b.id === currentBattle.id ? { ...b, winner, votes: { driver1Votes, driver2Votes } } : b
    );
    
    setBracket(updatedBracket);
    setJudgeVotes({ judge1: null, judge2: null, judge3: null });
    
    // Move to next battle
    const nextBattle = updatedBracket.find(b => !b.winner);
    setCurrentBattle(nextBattle || null);
  };

  const unresolvedBattles = bracket.filter(b => !b.winner);
  const resolvedBattles = bracket.filter(b => b.winner);

  return (
    <div style={{ padding: '40px' }}>
      <div style={{ maxWidth: '1600px', margin: '0 auto' }}>
        {currentBattle ? (
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '30px' }}>
            {/* Current Battle */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.03)',
              border: '2px solid rgba(227, 30, 36, 0.3)',
              padding: '40px',
              clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 30px), calc(100% - 30px) 100%, 0 100%)'
            }}>
              <div style={{
                fontSize: '14px',
                opacity: 0.8,
                marginBottom: '10px',
                letterSpacing: '2px'
              }}>
                ROUND {currentBattle.round} - BATTLE {bracket.indexOf(currentBattle) + 1}
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr auto 1fr',
                gap: '30px',
                alignItems: 'center',
                marginBottom: '40px'
              }}>
                <DriverCard driver={currentBattle.driver1} side="left" />
                
                <div style={{
                  fontSize: '48px',
                  fontWeight: 900,
                  color: '#E31E24'
                }}>
                  VS
                </div>

                <DriverCard driver={currentBattle.driver2} side="right" />
              </div>

              {/* Judge Voting */}
              <div style={{
                background: 'rgba(0, 0, 0, 0.5)',
                padding: '30px',
                border: '2px solid rgba(227, 30, 36, 0.3)'
              }}>
                <div style={{
                  fontSize: '20px',
                  fontWeight: 700,
                  marginBottom: '20px',
                  letterSpacing: '2px'
                }}>
                  JUDGE VOTES
                </div>

                <div style={{ display: 'grid', gap: '15px' }}>
                  {['judge1', 'judge2', 'judge3'].map((judge, idx) => (
                    <div key={judge} style={{
                      display: 'grid',
                      gridTemplateColumns: '100px 1fr 1fr',
                      gap: '15px',
                      alignItems: 'center'
                    }}>
                      <div style={{ fontWeight: 700 }}>JUDGE {idx + 1}</div>
                      
                      <button
                        onClick={() => setJudgeVotes({ ...judgeVotes, [judge]: 'driver1' })}
                        style={{
                          padding: '15px',
                          background: judgeVotes[judge] === 'driver1' ? '#E31E24' : 'rgba(255, 255, 255, 0.1)',
                          color: judgeVotes[judge] === 'driver1' ? '#000000' : '#ffffff',
                          border: judgeVotes[judge] === 'driver1' ? '2px solid #ffffff' : '2px solid rgba(255, 255, 255, 0.2)',
                          cursor: 'pointer',
                          fontWeight: 700,
                          fontSize: '14px'
                        }}
                      >
                        {currentBattle.driver1.driver.name}
                      </button>

                      <button
                        onClick={() => setJudgeVotes({ ...judgeVotes, [judge]: 'driver2' })}
                        style={{
                          padding: '15px',
                          background: judgeVotes[judge] === 'driver2' ? '#E31E24' : 'rgba(255, 255, 255, 0.1)',
                          color: judgeVotes[judge] === 'driver2' ? '#000000' : '#ffffff',
                          border: judgeVotes[judge] === 'driver2' ? '2px solid #ffffff' : '2px solid rgba(255, 255, 255, 0.2)',
                          cursor: 'pointer',
                          fontWeight: 700,
                          fontSize: '14px'
                        }}
                      >
                        {currentBattle.driver2.driver.name}
                      </button>
                    </div>
                  ))}
                </div>

                <button
                  onClick={submitVotes}
                  disabled={Object.values(judgeVotes).some(v => v === null)}
                  style={{
                    marginTop: '30px',
                    width: '100%',
                    padding: '20px',
                    background: Object.values(judgeVotes).some(v => v === null) ? '#666' : '#E31E24',
                    color: '#000000',
                    border: 'none',
                    fontSize: '18px',
                    fontWeight: 900,
                    cursor: Object.values(judgeVotes).some(v => v === null) ? 'not-allowed' : 'pointer',
                    letterSpacing: '2px'
                  }}
                >
                  SUBMIT VOTES & NEXT BATTLE
                </button>
              </div>
            </div>

            {/* Battle Progress */}
            <div>
              <div style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '2px solid rgba(255, 255, 255, 0.1)',
                padding: '20px',
                marginBottom: '20px'
              }}>
                <div style={{ fontSize: '18px', fontWeight: 700, marginBottom: '15px' }}>
                  PROGRESS
                </div>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <div style={{
                    flex: 1,
                    height: '30px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    position: 'relative',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      height: '100%',
                      width: `${(resolvedBattles.length / bracket.length) * 100}%`,
                      background: 'linear-gradient(90deg, #E31E24 0%, #ffffff 100%)',
                      transition: 'width 0.5s'
                    }} />
                  </div>
                  <div style={{ fontSize: '20px', fontWeight: 900 }}>
                    {resolvedBattles.length}/{bracket.length}
                  </div>
                </div>
              </div>

              <div style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '2px solid rgba(255, 255, 255, 0.1)',
                padding: '20px'
              }}>
                <div style={{ fontSize: '18px', fontWeight: 700, marginBottom: '15px' }}>
                  UPCOMING BATTLES
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {unresolvedBattles.slice(0, 5).map((battle, idx) => (
                    <div
                      key={battle.id}
                      style={{
                        padding: '10px',
                        background: battle.id === currentBattle.id ? 'rgba(227, 30, 36, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                        border: battle.id === currentBattle.id ? '2px solid #E31E24' : '1px solid rgba(255, 255, 255, 0.1)',
                        fontSize: '14px'
                      }}
                    >
                      <div style={{ fontWeight: 700, marginBottom: '5px' }}>
                        {battle.driver1.driver.name}
                      </div>
                      <div style={{ opacity: 0.7, fontSize: '12px' }}>vs</div>
                      <div style={{ fontWeight: 700, marginTop: '5px' }}>
                        {battle.driver2.driver.name}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '100px' }}>
            <Trophy size={80} color="#E31E24" style={{ marginBottom: '30px' }} />
            <h2 style={{ fontSize: '48px', fontWeight: 900, marginBottom: '20px' }}>
              TOURNAMENT COMPLETE!
            </h2>
            <div style={{ fontSize: '24px', opacity: 0.8 }}>
              All battles have been resolved
            </div>
            
            {resolvedBattles.length > 0 && (
              <div style={{ marginTop: '50px' }}>
                <div style={{ fontSize: '20px', fontWeight: 700, marginBottom: '20px' }}>
                  FINAL RESULTS
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '600px', margin: '0 auto' }}>
                  {resolvedBattles.map((battle, idx) => (
                    <div
                      key={battle.id}
                      style={{
                        padding: '15px',
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}
                    >
                      <div>
                        <div style={{ fontSize: '12px', opacity: 0.7, marginBottom: '5px' }}>
                          BATTLE {idx + 1}
                        </div>
                        <div style={{ fontWeight: 700 }}>
                          {battle.winner.driver.name}
                        </div>
                      </div>
                      <div style={{ fontSize: '14px', opacity: 0.8 }}>
                        {battle.votes?.driver1Votes || 0} - {battle.votes?.driver2Votes || 0}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function DriverCard({ driver, side }) {
  return (
    <div style={{
      background: 'rgba(227, 30, 36, 0.1)',
      border: '2px solid #E31E24',
      padding: '30px',
      textAlign: side === 'left' ? 'left' : 'right',
      clipPath: side === 'left' 
        ? 'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 0 100%)'
        : 'polygon(20px 0, 100% 0, 100% 100%, 0 100%, 0 20px)'
    }}>
      <div style={{ fontSize: '14px', opacity: 0.7, marginBottom: '5px' }}>
        RANK #{driver.driver.id} • QUALIFYING: {driver.average}
      </div>
      <div style={{ fontSize: '28px', fontWeight: 900, marginBottom: '5px' }}>
        {driver.driver.name}
      </div>
      <div style={{ fontSize: '18px', opacity: 0.9 }}>
        {driver.driver.number}
      </div>
    </div>
  );
}
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta name="description" content="RC Drift Competition Judging System - TODAK RC" />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Rajdhani:wght@300;400;500;600;700&family=Orbitron:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
    <title>RC Drift Judging System - TODAK</title>
    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      
      body {
        margin: 0;
        font-family: 'Rajdhani', 'Orbitron', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
          'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
          sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        overflow-x: hidden;
      }
      
      code {
        font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
          monospace;
      }
      
      #root {
        min-height: 100vh;
      }

      /* Custom scrollbar */
      ::-webkit-scrollbar {
        width: 10px;
      }
      
      ::-webkit-scrollbar-track {
        background: #1a1a1a;
      }
      
      ::-webkit-scrollbar-thumb {
        background: #E31E24;
        border-radius: 5px;
      }
      
      ::-webkit-scrollbar-thumb:hover {
        background: #ff2a31;
      }
    </style>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
  </body>
</html>

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

{
  "name": "rc-drift-judging-system",
  "version": "1.0.0",
  "description": "RC Drift Competition Judging System",
  "private": true,
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "lucide-react": "^0.263.1"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "eslintConfig": {
    "extends": [
      "react-app"
    ]
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  },
  "devDependencies": {
    "react-scripts": "5.0.1"
  }
}

# RC Drift Judging System

Professional judging system for RC drift competitions, developed for TODAK RC.

## Features

### Qualifying Mode
- 3 judges score simultaneously (Angle, Speed, Line, Style)
- 2-minute timer for each run
- Real-time leaderboard with auto-ranking
- Automatic Top 24 selection for battle rounds

### Battle Mode
- Seeded bracket system (Rank #1 vs #24, etc.)
- 3-judge voting system
- Live bracket updates
- Progress tracking

## Tech Stack

- React 18
- Lucide React Icons
- Custom CSS animations
- Responsive design

## Getting Started

### Install Dependencies
```bash
npm install
```

### Run Development Server
```bash
npm start
```

### Build for Production
```bash
npm build
```

## Deploy to Netlify

1. Push code to GitHub
2. Connect GitHub repo to Netlify
3. Build settings:
   - Build command: `npm run build`
   - Publish directory: `build`
4. Deploy!

## Credits

Designed and developed for TODAK RC
- Racing-inspired aesthetics
- Professional broadcast feel
- Built for real competition use

---

© 2025 TODAK RC - All Rights Reserved
