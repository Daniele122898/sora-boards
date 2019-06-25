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
                <div className="leaderboard__header">
                    <div className="leaderboard__item">
                        <h3>
                            <strong>
                                #{user.rank}
                            </strong>
                        </h3>
                    </div>
                    <div className="leaderboard__item">
                        <img src={user.avatarUrl} alt="User Avatar"/>
                    </div>
                    <div className="leaderboard__item">
                        <h3>
                            <span className="leaderboard__username">
                                {user.name}
                            </span>
                            <small>
                                #{user.discrim}
                            </small>
                        </h3>
                    </div>
                </div>
                <div className="leaderboard__item">
                    <h5 className="leaderboard__center">
                        {user.exp} / {neededExp} <strong>EXP</strong>
                    </h5>
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
                <div className="leaderboard__item">
                    <h3>
                        Level {level}
                    </h3>
                </div>
            </div>
        </div>
    );
}

export default LeaderboardEntry;