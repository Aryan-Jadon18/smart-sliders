/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';
import { useState, useEffect } from '@wordpress/element';
/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';
import axios from 'axios';
/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit() {
	const [posts, setPosts] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('https://wptavern.com/wp-json/wp/v2/posts')
            .then(response => {
                setPosts(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setLoading(false);
            });
    }, []);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % posts.length);
    };

    const previousSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? posts.length - 1 : prevIndex - 1
        );
    };

    if (loading) {
        return (
            <p {...useBlockProps()} className="loading">
                {__('Loading...', 'smart-sliders')}
            </p>
        );
    }

    if (posts.length === 0) {
        return (
            <p {...useBlockProps()}>
                {__('No data available.', 'smart-sliders')}
            </p>
        );
    }

    const currentPost = posts[currentIndex];

    return (
        <div {...useBlockProps()} className="your-slideshow-container">
            <h2>{currentPost.title.rendered}</h2>
            <img
                src={currentPost.jetpack_featured_media_url}
                alt={currentPost.title.rendered}
            />
            <p>{currentPost.date}</p>
            <div dangerouslySetInnerHTML={{ __html: currentPost.content.rendered }} />
            {/* You can access other data like categories, tags, etc. as needed */}
            <button onClick={previousSlide}>Previous</button>
            <button onClick={nextSlide}>Next</button>
        </div>
	);
}
