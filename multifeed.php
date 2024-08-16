<?php
/**
 * Plugin Name:       WP RSS Block -- MultiFeed
 * Description:       Enable multi-feed feature on RSS block.
 * Requires at least: 6.5
 * Requires PHP:      8.2
 * Version:           1.0.1
 * Author:            Kelvin Xu
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       wp-rss-block--multifeed
 * Requires Plugins:  wp-rss-block
 *
 * @package           wp-rss-block--multifeed
 */

namespace UBC\CTLT\Block\MultiFeed;

add_action( 'enqueue_block_editor_assets', __NAMESPACE__ . '\\enqueue_scripts', 99 );

	/**
	 * Enqueues the necessary scripts and styles for the editor.
	 *
	 * @return void
	 */
function enqueue_scripts() {
	wp_enqueue_script(
		'wp-rss-block--multifeed-script',
		plugin_dir_url( __FILE__ ) . '/build/index.js',
		array(),
		filemtime( plugin_dir_path( __FILE__ ) . '/build/index.js' ),
		true
	);

	wp_enqueue_style(
		'wp-rss-block--multifeed-style',
		plugin_dir_url( __FILE__ ) . '/build/index.css',
		array(),
		filemtime( plugin_dir_path( __FILE__ ) . '/build/index.css' )
	);
}

add_filter( 'wp_rss_block_fetch_source', __NAMESPACE__ . '\\merge_additional_urls', 10, 2 );

/**
 * Merges additional URLs into the source array.
 *
 * @param array $source The primary RSS feed URL.
 * @param array $attributes The attributes array containing additional feeds.
 * @return array The merged array of URLs.
 */
function merge_additional_urls( $source, $attributes ) {
	return array_key_exists( 'additionalFeeds', $attributes ) ? array_merge( array( $source ), $attributes['additionalFeeds'] ) : $source;
}
