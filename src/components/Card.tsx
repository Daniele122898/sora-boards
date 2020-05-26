import React, { ReactChild } from 'react';
import {WaifuRarity} from "../store";

const getRarityStringFromInt = (rarity: Number, rarities: WaifuRarity[]): string => {
    const rar = rarities.find(x=> x.value === rarity)
    if (rar == undefined)
        return "Unknown";
    return rar.name;
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
