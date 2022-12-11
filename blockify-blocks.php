<?php
/**
 * Plugin Name:  Blockify Blocks
 * Plugin URI:   https://blockifywp.com/blocks
 * Description:  Lightweight experimental block library for WordPress.
 * Author:       Blockify
 * Author URI:   https://blockifywp.com/
 * Version:      0.0.1
 * License:      GPLv2-or-Later
 * Requires WP:  6.1
 * Requires PHP: 7.4
 * Text Domain:  blockify
 */

declare( strict_types=1 );

namespace Blockify\Blocks;

use const GLOB_ONLYDIR;
use function add_action;
use function array_map;
use function glob;
use function register_block_type;

add_action( 'init', function () {
	array_map( function ( $dir ) {
		register_block_type( $dir );
	}, glob( __DIR__ . '/build/*', GLOB_ONLYDIR ) );
} );
