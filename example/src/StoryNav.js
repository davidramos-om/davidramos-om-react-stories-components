import React from 'react';

export const StoryNav = ({ onPrevious, onClose, onNext }) => {

    const handlePrevious = (e) => {
        e.preventDefault();
        if (onPrevious)
            onPrevious();
    }

    const handleClose = (e) => {
        e.preventDefault();
        if (onClose)
            onClose();
    }

    const handleNext = (e) => {
        e.preventDefault();
        if (onNext)
            onNext();
    }

    return (
        <div className="storyNavigationContainer">
            <div className="storyNavigationTopLeft" onClick={handlePrevious} >
                <a href="#" className="previous round" >&#8249;</a>
            </div>

            <div className="storyNavigationCenter" onClick={handleClose}>
                <a href="#" className="previous round" >x</a>
            </div>

            <div className="storyNavigationTopRight" onClick={handleNext}>
                <a href="#" className="next round" >&#8250;</a>
            </div>
        </div >
    );
}