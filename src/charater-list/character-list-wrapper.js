import React from 'react'
export const CharacterListWrpper = (props) => {
    const character = (char) => {
        return (
            <div key={char.id}>
                <img src={char.image} alt={char.name}/>
                <span>{char.id} </span>
                <span>{char.name} </span>
                <span>location: {char.origin.name} </span>
            </div>
        )
    };
    const charList = props.charList.map(character);
    return (charList);
}
