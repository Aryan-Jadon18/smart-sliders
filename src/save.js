/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */
export default function save({ attributes }) {
    const { posts, currentIndex } = attributes;

	if (!posts || !Array.isArray(posts) || posts.length === 0 || currentIndex < 0 || currentIndex >= posts.length) {
		return (
			<p { ...useBlockProps.save() }>
				{ 'No data available.' }
			</p>
		);
	}

	const currentPost = posts[currentIndex];

	return (
		<div { ...useBlockProps.save() } className="your-slideshow-container">
			<h2>{currentPost.title.rendered}</h2>
			<img
				src={currentPost.jetpack_featured_media_url}
				alt={currentPost.title.rendered}
			/>
			<p>{currentPost.date}</p>
			<div dangerouslySetInnerHTML={{ __html: currentPost.content.rendered }} />
			{/* You can access other data like categories, tags, etc. as needed */}
		</div>
	);
}
