import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

registerBlockType( 'blockify/slide', {
    apiVersion: 2,
    title: __( 'Slide', 'blockify' ),
    parent: [
        'blockify/slider'
    ],
    icon: 'table-row-after',
    category: 'blockify',
    keywords: [
        'carousel',
        'swipe',
        'scroll'
    ],
    supports: {
        "color": {
            "gradients": true
        },
        "spacing": {
            "margin": true,
            "padding": true,
            "blockGap": true
        },
        "__experimentalBorder": {
            "width": true,
            "style": true,
            "color": true,
            "radius": true,
            "__experimentalDefaultControls": {
                "width": true,
                "color": true
            }
        }
    },
    edit: () => {
        const blockProps           = useBlockProps();
        const innerBlocksProps     = useInnerBlocksProps( blockProps );
        innerBlocksProps.className = innerBlocksProps.className + ' glide__slide';

        return <div { ...innerBlocksProps } className={ blockProps.className + ' glide__slide' }/>;
    },
    save: () => {
        const blockProps           = useBlockProps.save();
        const innerBlocksProps     = useInnerBlocksProps.save();
        innerBlocksProps.className = innerBlocksProps.className + ' glide__slide';

        return <div { ...innerBlocksProps } className={ blockProps.className }/>;
    }
} );
