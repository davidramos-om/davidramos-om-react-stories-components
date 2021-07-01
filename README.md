
<h1 style="margin: 0" align="center">react-stories-components</h1>
<p align="center">A React component for Instagram like stories</p>

<p align="center">
<a href="https://davidramos-om.github.io/react-stories-components/">
	Demo Homepage
</p>

<div align="center">
	<a href="https://www.npmjs.com/package/react-stories-components">
	<img alt="NPM" src="https://img.shields.io/npm/v/react-stories-components.svg">
	</a>&nbsp;
	<a href="https://standardjs.com">
		<img alt="JavaScript Style Guide" src="https://img.shields.io/badge/code_style-standard-brightgreen.svg">
	</a>&nbsp;
</div>
<p align="center">
  <a href="https://raw.githubusercontent.com/davidramos-om/react-stories-components/master/LICENSE">
    <img src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
  <a href="https://www.npmjs.com/package/react-stories-components">
    <img src="https://img.shields.io/npm/dt/react-stories-components.svg" alt="downloads" />
  </a>
</p>
<br>


This project is a fork from [mohitk05's stories](https://github.com/mohitk05/react-insta-stories), and it was only created to implement the functionality of clickable components.

Please keep updated on the original one.

## Install

```bash
npm install --save react-stories-components
```

## Demo

The component responds to actions like tap on right side for next story, on left for previous and tap and hold for pause. Custom time duration for each story can be provided.

`clickable` doesn't respond to actions like a tap on the right-left side for the next-previous story. 
Therefore you should `useNavigationBar: true` to enable it.

See it in action [here](https://davidramos-om.github.io/react-stories-components/)


## New features v. 1.0.2
### Props

| Property             | Type            | Default                   | Description                                                                                                                                                         |
| -------------------- | --------------- | ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **New props**        | ⭐️             | ⭐️                       | ⭐️                                                                                                                                                                 |
| `automatic` (Stories component) | Boolean | true | Toggle stories autoplaying state |
| `onStoryChange` (Stories component) | Event |(prev, current, next) => { } | It is triggered every time the displayed story change, either manually, keyboardNavigation or automatic. |
| `hideStoryProgress` (story object)  | Boolean | false | Hide to top progress indicator, useful when a custom nav is added, take a peek at the preview|
| `preventChangeSideTapped` (story object) | Boolean     | false | Disable going to prev/next story when you are tapping the left-right side.|
## Features v. 1.0.1

### Story object props
| Property           | Description                                                                                                                                   |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------- |
| **New props on this fork**        | ⭐️ | 
|`clickable`        | Optional. Allow the `content:({action,isPaused})` children elements to be clickeable. As a <b>side-effect</b> story won't pass to next-previous on touch right-leftt
| `stopOnClick`     | Optional. If it true, the story will stop when the children elements are tapped/clicked
| `onStoryClicked` | Optional. Fires when an element is/clicked tapped. params (currentId, story, e.target)
 

## Documentation
API documentation available [here.](/doc.md)

## Example
Look at the gif example code [here.](/example.md)
## License

MIT © [davidramos-om](https://github.com/davidramos-om)
