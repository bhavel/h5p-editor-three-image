import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {H5PContext} from "../../../../context/H5PContext";
import './GoToScene.scss';
import GoToSceneSelector from "./GoToSceneSelector";

export default class GoToScene extends Component {

  render() {
    // Filter out current scene
    const scenes = this.context.params.scenes.filter(scene => {
      return scene.sceneId !== this.props.currentScene;
    });

    const sceneClasses = ['go-to-scene'];
    if (this.props.hasInputError) {
      sceneClasses.push('has-error');
    }

    return (
      <div className={sceneClasses.join(' ')} >
        {
          scenes.length > 0 &&
          <div className='go-to-scene-selector-wrapper'>
            <GoToSceneSelector
              scenes={scenes}
              markedScene={this.props.markedScene}
              setNextSceneId={this.props.setNextSceneId.bind(this)}
            />
            <div className='selector-separator'>or</div>
          </div>
        }
        <div className='create-new-scene-wrapper'>
          <div className='new-scene-title'>Create a new scene to go to:</div>
          {
            this.props.hasInputError && !scenes.length &&
            <div className='error-message'>Please create a new scene to proceed</div>
          }
          <button
            className='h5p-new-scene-button'
            onClick={this.props.newScene.bind(this)}
          >+ New scene</button>
        </div>
      </div>
    );
  }
}

GoToScene.contextType = H5PContext;

GoToScene.propTypes = {
  currentScene: PropTypes.number.isRequired,
  markedScene: PropTypes.number,
  hasInputError: PropTypes.bool,
  setNextSceneId: PropTypes.func.isRequired,
  newScene: PropTypes.func.isRequired,
};