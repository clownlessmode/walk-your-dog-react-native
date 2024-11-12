import React, { useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import MiniStories from './MiniStories';
import FullScreenStory from './FullScreenStory';
import { useStoriesController } from '@entity/stories/stories.controller';

const StoryViewer: React.FC = () => {
  const { stories, isStoriesLoading } = useStoriesController();
  const [currentStoryIndex, setCurrentStoryIndex] = useState<number | null>(null);

  // Handlers for story navigation
  const handleStoryPress = (id: string) => {
    const index = stories?.findIndex((story) => story.id === id);
    if (index !== undefined && index !== -1) {
      setCurrentStoryIndex(index);
    }
  };

  const handleClose = () => {
    setCurrentStoryIndex(null);
  };

  const handleNextStory = () => {
    if (currentStoryIndex !== null && stories && currentStoryIndex < stories.length - 1) {
      setCurrentStoryIndex(currentStoryIndex + 1);
    } else {
      handleClose();
    }
  };

  const handlePreviousStory = () => {
    if (currentStoryIndex !== null && stories && currentStoryIndex > 0) {
      setCurrentStoryIndex(currentStoryIndex - 1);
    } else {
      handleClose();
    }
  };

  // Determine the current story based on the index
  const currentStory = currentStoryIndex !== null && stories ? stories[currentStoryIndex] : null;

  return (
    <View style={{ flex: 1 }}>
      {/* Display loading spinner if stories are still loading */}
      {isStoriesLoading || !stories ? (
        <ActivityIndicator size="small" color="black" />
      ) : (
        <>
          <MiniStories stories={stories} onStoryPress={handleStoryPress} />

          {/* Render FullScreenStory if a story is selected */}
          {currentStory && (
            <FullScreenStory
              story={currentStory}
              isVisible={currentStoryIndex !== null}
              onClose={handleClose}
              onNextStory={handleNextStory}
              onPreviousStory={handlePreviousStory}
            />
          )}
        </>
      )}
    </View>
  );
};

export default StoryViewer;
