import React, { ReactChild } from 'react';

const getRarityStringFromInt = (rarity: Number): string => {
    switch(rarity) {
        case 0: 
            return "Common";
        case 1: 
            return "Uncommon";
        case 2: 
            return "Rare";
        case 3: 
            return "Epic";
        case 99: 
            return "Ultimate Waifu";
        case 5:
            return "Halloween";
        case 6:
            return "Christmas";
        case 7:
            return "Summer";
        default:
            return "Common";
    }
};

const Card = ({imageUrl, name, rarity, id, enableIdFooter = false, children, count = 0}: 
    { imageUrl: string, name: string, rarity: string, id: string, enableIdFooter?: boolean,
    children?: ReactChild, count?: number }) => (
    <div className="card">
        <div className="crop pop">
            <img src={imageUrl ? imageUrl : 
                "https://cdn.argonaut.pw/lxvFBNdShIvb4efQvT60d99iXlN4TFXe.png"} 
                alt="Waifu Image"/>
        </div>
        <div className="card-body card-body--title">
            <h5 className="card-title">{name ? name : 'Name' }</h5>
        </div>
        <ul className="list-group list-group-flush">
            <li className="list-group-item">{rarity}</li>
            { count > 0 &&
                <li className="list-group-item">{count}</li>
            }
        </ul>
        { enableIdFooter && 
            <div className="card-body card-body--id">
                <p className="card-text"><span className="waifuId">ID: {id}</span></p>
            </div>
        }
        { children }
    </div>
);

export {Card as default, getRarityStringFromInt};