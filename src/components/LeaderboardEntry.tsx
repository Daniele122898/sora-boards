import React from 'react';
import { User } from '../store/index';

function calculateLevel(exp: number){
    return Math.floor(0.15*Math.sqrt(exp));
}

function calculateNeededExp(lvl: number){
    return Math.pow(lvl/0.15,2);
}


const LeaderboardEntry = ({user, key}: {user: User, key: number}) => {
    const level = calculateLevel(user.exp);
    const neededExp = calculateNeededExp(level+1);
    const neededPrev = calculateNeededExp(level);
    const totalNeededExp = neededExp - neededPrev;
    const hasOfNeeded = user.exp - neededPrev;
    const percent = 100/totalNeededExp * hasOfNeeded;
    return (
        <div className="list-group-item" key={key}>
            <div className="leaderboard-entry">
                <div className="leaderboard__header width-55">
                    <div className="leaderboard__item">
                        <h2>
                            <strong>
                                #{user.rank}
                            </strong>
                        </h2>
                    </div>
                    <div className="leaderboard__item" style={{display: "flex"}}>
                        <img className="leaderboard__image" src={user.avatarUrl} alt="User Avatar"/>
                    </div>
                    <div className="leaderboard__item">
                        <h2 className="leaderboard-word-break">
                            <span className="leaderboard__username">
                                {user.name}
                            </span>
                            <small>
                                #{user.discrim}
                            </small>
                        </h2>
                    </div>
                </div>
                <div className="leaderboard__item width-25">
                    <h4 className="leaderboard__center">
                        {user.exp} / {Math.round(neededExp)} <strong>EXP</strong>
                    </h4>
                    <div className="progress">
                        <div 
                            className="progress-bar progress-bar-striped progress-bar-sora" 
                            role="progressbar"
                            style={{
                                width: `${percent}%`
                            }}
                        >
                        </div>
                    </div>
                </div>  
                <div className="leaderboard__item" style={{width: "18%"}}>
                    <h2>
                        Level {level}
                    </h2>
                </div>
            </div>
        </div>
    );
}

export default LeaderboardEntry;