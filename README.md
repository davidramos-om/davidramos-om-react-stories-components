
<h1 style="margin: 0" align="center">react-stories-components</h1>
<p align="center">A React component for Instagram like stories</p>

<p align="center">
<a href="https://davidramos-om.github.io/react-stories-components/">
	Homepage
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


This project is a fork from [mohitk05's stories](https://github.com/mohitk05/react-stories-components), and it was only created to implement the functionality of clickable components.

Please keep updated on the original one.

This one will online until [mohitk05's repo](https://github.com/mohitk05/react-stories-components) accomplishing this functionality.
 

<img height="600" src="https://i.imgur.com/Y1s8FKb.png" alt="Demo screenshot"/>

## Install

```bash
npm install --save react-stories-components
```

## Demo

The component responds to actions like tap on right side for next story, on left for previous and tap and hold for pause. Custom time duration for each story can be provided.
See it in action here: https://mohitk05.github.io/react-stories-components/



## Props

| Property             | Type            | Default                   | Description                                                                                                                                                         |
| -------------------- | --------------- | ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `stories`            | [String/Object] | `required`                | An array of image urls or array of story objects (options described below)                                                                                          |
| `renderers` ⚡️      | [Object]        | `[]`                      | An array of renderer objects (options described below)                                                                                                              |
| `defaultInterval`    | Number          | 1200                      | Milliseconds duration for which a story persists                                                                                                                    |
| `loader`             | Component       | Ripple loader             | A loader component as a fallback until image loads from url                                                                                                         |
| `header`             | Component       | Default header as in demo | A header component which sits at the top of each story. It receives the `header` object from the `story` object. Data for header to be sent with each story object. |
| `width`              | Number          | 360                       | Width of the component in pixels                                                                                                                                    |
| `height`             | Number          | 640                       | Height of the component in pixels                                                                                                                                   |
| `storyStyles`        | Object          | none                      | Override the default story styles mentioned below.                                                                                                                  |
| `loop`               | Boolean         | false                     | The last story loop to the first one and restart the stories.                                                                                                       |
| **New props**        | ⭐️             | ⭐️                       | ⭐️                                                                                                                                                                 |
| `isPaused`           | Boolean         | false                     | Toggle story playing state                                                                                                                                          |
| `currentIndex`       | Number          | undefined                 | Set the current story index                                                                                                                                         |
| `onStoryStart`       | Function        | -                         | Callback when a story starts                                                                                                                                        |
| `onStoryEnd`         | Function        | -                         | Callback when a story ends                                                                                                                                          |
| `onAllStoriesEnd`    | Function        | -                         | Callback when all stories in the array have ended                                                                                                                   |
| `keyboardNavigation` | Boolean         | false                     | Attaches arrow key listeners to navigate between stories if true. Also adds up arrow key listener for opening See More and Escape/down arrow for closing it         |

### Story object

Instead of simple string url, a comprehensive 'story object' can also be passed in the `stories` array.

| Property           | Description                                                                                                                                   |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `url`              | The url of the resource, be it image or video.                                                                                                |
| `type`             | Optional. Type of the story. `type: 'video'                                                                                                   | 'image'`. Type `video` is necessary for a video story. |
| `duration`         | Optional. Duration for which a story should persist.                                                                                          |
| `header`           | Optional. Adds a header on the top. Object with `heading`, `subheading` and `profileImage` properties.                                        |
| `seeMore`          | Optional. Adds a see more icon at the bottom of the story. On clicking, opens up this component. (v2: updated to Function instead of element) |
| `seeMoreCollapsed` | Optional. Send custom component to be rendered instead of the default 'See More' text.                                                        |  |
| `styles`           | Optional. Override the default story styles mentioned below|
| **New props on this fork**        | ⭐️ | 
|`clickable`        | Optional. Allow the `content:({action,isPaused})` children elements to be clickeable. As a <b>side-effect</b> story won't pass to next-previous on touch right-leftt
| `stopOnClick`     | Optional. If it true, the story will stop when the children elements are tapped/clicked

## Usage

```jsx
import React, { Component } from 'react';

import Stories from 'react-stories-components';

const App = () => {
	return (
		<Stories
			stories={stories}
			defaultInterval={1500}
			width={432}
			height={768}
		/>
	);
};
```

Here `stories` is an array of story objects, which can be of various types as described [above](#story-object).
### Default story styles

Following are the default story content styles. Override them by providing your own style object with each story or a global override by using the `storyStyles` prop.

```js
storyContent: {
    width: 'auto',
    maxWidth: '100%',
    maxHeight: '100%',
    margin: 'auto'
}
```

### Renderers

To allow reusable components to display story UI, you can pass in pre-built or custom-built components in a special manner to leverage this behavior. Each renderer object has two properties:

-   `renderer` - This is the UI component that will be rendered whenever the object matches certain conditions.
-   `tester` - This is a function that tests whether the renderer is suitable for the current story. It receives the current story object to render and returns an object with two properties:
    -   `condition` - This states if the renderer matches the current story's criteria (a boolean).
    -   `priority` - A number denoting the priority of the current renderer. E.g. priority of 2 is less than a 5, and if two renderers have condition = `true`, their priorities will be compared and the one with higher priority will be selected.

So essentially a simple renderer would look like this:
(you may also refer the inbuilt [Image renderer](src/renderers/Image.tsx))

```jsx
// Renderer.js

export const renderer = ({ story, action, isPaused, config }) => {
	return <div>Hello!</div>;
};

export const tester = (story) => {
	return {
		// Use this renderer only when the story type is video
		condition: story.type === 'video',
		priority: 3,
	};
};
```

Every `renderer` component gets 4 props as shown above. Out of these the `story`, `action` and `isPaused` are as their names suggest. The `config` object contains certain global properties which were passed while initialising the component. It looks like this:

```js
const { width, height, loader, storyStyles } = config;
```

> These props can be used to customize the entire UI as required, and then can be packaged as a Node module and shared. If someone else wishes to use your package as a renderer, they can simply pass it inside an array as the `renderers` prop to the main component.
> _If you publish any such renderer, please raise a PR to add it to this list. A few suggestions would be a Markdown renderer, highlighted code renderer, etc._

List of public renderers:

-   Add one here

### Higher Order Components

#### `WithSeeMore`

This is a wrapper component which includes the UI and logic for displaying a 'See More' link at the bottom of the story. This is available as a named export from the package and can be used to easily add the functionality to a custom content story.
It takes in two props - `story` and `action`.

```jsx
const { WithSeeMore } from 'react-stories-components';

const CustomStoryContent = ({ story, action }) => {
	return <WithSeeMore story={story} action={action}>
		<div>
			<h1>Hello!</h1>
			<p>This story would have a 'See More' link at the bottom ✨</p>
		</div>
	</WithSeeMore>
}
```

You can also send custom 'See More' component for the collapsed state. While using `WithSeeMore`, pass in a `customCollapsed` prop with a value of your custom component. It will receive a `toggleMore` and `action` prop to handle clicks on the See More link.

```jsx
const { WithSeeMore } from 'react-stories-components';

const customCollapsedComponent = ({ toggleMore, action }) =>
	<h2 onClick={() => {
		action('pause');
		window.open('https://mywebsite.url', '_blank');
	}}>
		Go to Website
	</h2>

const CustomStoryContent = ({ story, action }) => {
	return <WithSeeMore
		story={story}
		action={action}
		customCollapsed={customCollapsedComponent}
	>
		<div>
			<h1>Hello!</h1>
			<p>This story would have a 'See More' link at the bottom and will open a URL in a new tab.</p>
		</div>
	</WithSeeMore>
}
```

If not implementing a custom UI, you can send the `customCollapsedComponent` component inside the story object as `seeMoreCollapsed`.

```jsx
const stories = [
	{
		url: 'some.url',
		seeMore: SeeMoreComponent, // when expanded
		seeMoreCollapsed: customCollapsedComponent, // when collapsed
	},
];
```

#### `WithHeader`

This named export can be used to include the header UI on any custom story. Simply wrap the component with this HOC and pass in some props.

```jsx
const { WithHeader } from 'react-stories-components';

const CustomStoryContent = ({ story, config }) => {
	return <WithHeader story={story} globalHeader={config.header}>
		<div>
			<h1>Hello!</h1>
			<p>This story would have the configured header!</p>
		</div>
	</WithHeader>
}
```

You may also use both these HOCs together, as in the [Image renderer](src/renderers/Image.tsx).

## Common Usage

#### 1. Basic implementation with string URLs

If you wish to have a bare minimum setup and only need to show image stories, you can simply pass the image urls inside the `stories` array.
This will show all your images as stories.

```js
import Stories from 'react-stories-components';

const stories = [
	'https://example.com/pic.jpg',
	'data:image/jpg;base64,R0lGODl....',
	'https://mohitkarekar.com/icon.png',
];

return () => <Stories stories={stories} />;
```

#### 2. Customising stories

If plain images does not suffice your usecase, you can pass an object instead of a string. This object supports all the properties mentioned above in the section [story object](#story-object). While using the object type, use `url` to denote the source url in case of media.

These properties can be mixed in different ways to obtain desired output.

##### Duration

Each story can be set to have a different duration.

```jsx
const stories = [
	'https://example.com/pic.jpg',
	{
		url: 'https://example.com/pic2.jpg',
		duration: 5000,
	},
];
```

##### Header

Adds a header to the story.

```jsx
const stories = [
	'https://example.com/pic.jpg',
	{
		url: 'https://example.com/pic2.jpg',
		duration: 5000,
		header: {
			heading: 'Mohit Karekar',
			subheading: 'Posted 30m ago',
			profileImage: 'https://picsum.photos/100/100',
		},
	},
];
```

##### See More

Adds a click to see more option at the bottom of the story. When present, shows the arrow at the bottom and when clicked, shows the provided component.

```jsx
const stories = [
	'https://example.com/pic.jpg',
	{
		url: 'https://example.com/pic2.jpg',
		duration: 5000,
		seeMore: SeeMore, // some component
	},
	{
		url: 'https://example.com/pic3.jpg',
		duration: 2000,
		seeMore: ({ close }) => {
			return <div onClick={close}>Hello, click to close this.</div>;
		},
	},
];
```

##### Type

If provided `type: video`, then the component loads a video player. All expected features come in automatically. Duration is ignored, if provided and actual video duration is considered.

```jsx
const stories = [
	'https://example.com/pic.jpg',
	{
		url: 'https://example.com/vid.mp4',
		duration: 5000, // ignored
		type: 'video',
	},
];
```

##### Styles

Override default story element styles. Regular style object can be provided.

#### 3. Custom JSX as a story

You can render custom JSX inside a story by sending a `content` property inside the story object. If a `content` property is present, all other media related properties are ignored. `duration` holds true here.

```jsx
const stories = [
	'https://example.com/pic.jpg',
	{
		content: (props) => (
			<div style={{ background: 'pink', padding: 20 }}>
				<h1 style={{ marginTop: '100%', marginBottom: 0 }}>🌝</h1>
				<h1 style={{ marginTop: 5 }}>A custom title can go here.</h1>
			</div>
		),
	},
];
```

The content property can hold any React component. For further control, it receives two important props:

-   `action` It allows you to fire play/pause actions.
-   `isPaused` Holds true is the story is currently paused, false otherwise.

```jsx
const stories = [
	'https://example.com/pic.jpg',
	{
		content: ({ action, isPaused }) => {
			useEffect(() => {
				setTimeout(() => {
					action('pause');
					setTimeout(() => {
						action('play');
					}, 2000);
				}, 2000);
			}, []);
			return (
				<div style={{ background: 'pink', padding: 20 }}>
					<h1 style={{ marginTop: '100%', marginBottom: 0 }}>🌝</h1>
					<h1>{isPaused ? 'Paused' : 'Playing'}</h1>
				</div>
			);
		},
	},
];
```

In the code above, on render a timeout will be set which would fire a 'pause' action after 2 seconds. Again after 2 seconds, a 'play' action would be fired.
In the JSX, `isPaused` is used to display the current play state.
 
 ## Example src

 ```jsx 
 		<Stories
				loop
				keyboardNavigation
				defaultInterval={5000}
				stories={storiesList}
				onStoryEnd={(s, st) => console.log('story ended', s, st)}
				onAllStoriesEnd={(s, st) => console.log('all stories ended', s, st)}
				onStoryStart={(s, st) => console.log('story started', s, st)}
			/>
 ```

 ```jsx 
 	 
const StoryComponent = ({ action, isPaused }) => {
	return (
		<div style={{ ...contentStyle, background: 'Aquamarine', marginTop: '50%', color: '#16161d', height: '100%' }}>
			<h1>You get the control of the story.</h1>
			<p>Render your custom JSX by passing just a
				<code style={{ fontStyle: 'italic' }}> content</code> property inside your story object.</p>
			<p>You get a <code style={{ fontStyle: 'italic' }}>action</code> prop as an input to your content function, that can be used to play or pause the story.</p>
			<h1>{isPaused ? 'Paused' : 'Playing'}</h1>
		</div>
	);
}

const clickedComponentStory = ({ action, isPaused }) => {

	const handleButtonClick = (e) => {
		e.preventDefault();
		alert("Button clicked");
	}

	const handleTextClick = (e) => {
		e.preventDefault();
		alert("Text clicked");
	}

	return (
		<div style={{ background: '#4CAF50', color: 'white', padding: 20, margin: '0x', height: '100%' }}>

			<h1 style={{ marginTop: '50%', marginBottom: 0 }}>On this fork, now, you could add clickable components</h1>
			<p>by just passing</p>
			<pre>
				<code style={code}>
					clickable : true
        		</code>
				<br />
				<br />
				<code style={code}>
					stopOnClick : true
        		</code>
			</pre>
			<p>Property inside your story object.</p>
			<br />
			<button className="button-three" onClick={handleButtonClick} >Click Me</button>
			<br />
			<h3 style={{ cursor: 'pointer' }} onClick={handleTextClick} >Click on text</h3>
		</div>
	);
}

const storiesList = [
	{
		clickable: true,
		stopOnClick: true,
		content: clickedComponentStory,
	},
	{
		content: ({ action, isPaused }) => {
			return <div style={contentStyle}>
				<h1>The new version is here.</h1>
				<p>This is the new story.</p>
				<p>Now render React components right into your stories.</p>
				<p>Possibilities are endless, like here - here's a code block!</p>
				<pre>
					<code style={code}>
						console.log('Hello, world!')
        			</code>
				</pre>
				<p>Or here, an image!</p>
				<br />
				<img style={image} src="https://images.unsplash.com/photo-1565506737357-af89222625ad?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"></img>
				<h3>Perfect. But there's more! →</h3>
			</div>
		}
	},
	{
		content: ({ action, story }) => {
			return <WithSeeMore
				story={story}
				action={action}
			>
				<div style={{ background: 'pink', padding: 20, margin: '0x', height: '100%' }}>
					<h1 style={{ marginTop: '50%', marginBottom: 0 }}> 🚀  </h1>
					<h1 style={{ marginTop: 5 }}>We have our good old image and video stories, just the same.</h1>
				</div>
			</WithSeeMore>
		},
		seeMoreCollapsed: ({ toggleMore, action }) => {
			return (
				<p
					style={customSeeMore}
					onClick={() => toggleMore(true)}
				>
					A custom See More message
				</p>
			)
		},
		seeMore: ({ close }) => {
			return (
				<div
					style={{ maxWidth: '100%', height: '100%', padding: 40, background: 'white' }}
				>
					<h2>Just checking the see more feature.</h2>
					<p
						style={{ textDecoration: 'underline', cursor: 'pointer' }}
						onClick={close}
					>
						Close this popup.
					</p>
				</div>)
		},
		duration: 5000
	},
	{
		url: 'https://picsum.photos/1080/1920',
		seeMore: ({ close }) => {
			return (
				<div
					style={{ maxWidth: '100%', height: '100%', padding: 40, background: 'white' }}
				>
					<h2>Just checking the see more feature.</h2>
					<p style={{ textDecoration: 'underline' }}
						onClick={close}
					>
						Close this popup.
					</p>
				</div>
			)
		}
	},
	{
		url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
		type: 'video'
	},
	{
		content: StoryComponent
	}
]

const image = {
	display: 'block',
	maxWidth: '100%',
	borderRadius: 4,
}

const code = {
	background: '#eee',
	padding: '5px 10px',
	borderRadius: '4px',
	color: '#333',
}

const contentStyle = {
	background: 'salmon',
	width: '100%',
	padding: 20,
	color: 'white'
}

const customSeeMore = {
	textAlign: 'center',
	cursor: 'pointer',
	fontSize: 14,
	bottom: 50,
	position: 'relative'
}
 ```
## License

MIT © [davidramos-om](https://github.com/davidramos-om)
