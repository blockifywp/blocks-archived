import {
    useBlockProps,
    InnerBlocks
} from '@wordpress/block-editor';
import metadata from './block.json';
import './editor.scss';
import {
    registerBlockType
} from '@wordpress/blocks';
import './item.tsx';
import { postList } from "@wordpress/icons";

const getStyles = ( attributes, blockProps ) => {
    let backgroundColor = '';
    let borderColor     = '';

    if ( attributes?.gradient ) {
        backgroundColor = 'var(--wp--preset--gradient--' + attributes.gradient + ')';
    } else if ( attributes?.backgroundColor ) {
        backgroundColor = 'var(--wp--preset--color--' + attributes.backgroundColor + ')';
    } else if ( attributes?.style?.color?.gradient ) {
        backgroundColor = attributes.style.color.gradient;
    } else if ( attributes?.style?.color?.background ) {
        backgroundColor = attributes.style.color.background;
    }

    if ( attributes?.borderColor ) {
        borderColor = 'var(--wp--preset--color--' + attributes.borderColor + ')';
    } else if ( attributes?.style?.color?.border ) {
        borderColor = attributes.style.color.border;
    }

    delete blockProps?.style?.borderWidth;
    delete blockProps?.style?.paddingTop;
    delete blockProps?.style?.paddingRight;
    delete blockProps?.style?.paddingBottom;
    delete blockProps?.style?.paddingLeft;

    return {
        ...blockProps?.style,
        '--accordion--gap': attributes?.style?.spacing?.blockGap,
        '--accordion--background': backgroundColor,
        '--accordion--padding-top': attributes?.style?.spacing?.padding?.top,
        '--accordion--padding-right': attributes?.style?.spacing?.padding?.right,
        '--accordion--padding-bottom': attributes?.style?.spacing?.padding?.bottom,
        '--accordion--padding-left': attributes?.style?.spacing?.padding?.left,
        '--accordion--border-width': attributes?.style?.border?.width,
        '--accordion--border-style': attributes?.style?.border?.style,
        '--accordion--border-color': borderColor,
        '--accordion--border-radius': attributes?.style?.border?.radius,
        lineHeight: attributes?.style?.typography?.lineHeight ?? metadata.attributes.style.default.typography.lineHeight
    };
}

const stack = attributes => {
    let stack = { 'data-stack': false };

    if ( ! attributes?.style?.spacing?.blockGap || parseInt( attributes?.style?.spacing?.blockGap ) === 0 ) {
        stack = { 'data-stack': true };
    }

    return stack;
}

registerBlockType( metadata, {
    icon: postList,

    edit: ( { attributes } ) => {
        let blockProps = useBlockProps();

        return (
            <div { ...blockProps } { ...stack( attributes ) } style={ { ...getStyles( attributes, blockProps ) } }>
                <InnerBlocks
                    allowedBlocks={ [ 'blockify/accordion-item' ] }
                    template={ [
                        [ 'blockify/accordion-item' ],
                        [ 'blockify/accordion-item' ],
                        [ 'blockify/accordion-item' ]
                    ] }
                />
            </div>
        );
    },
    save: ( { attributes } ) => {
        let blockProps = useBlockProps.save();

        return (
            <div { ...blockProps } { ...stack( attributes ) } style={ { ...getStyles( attributes, blockProps ) } }>
                <InnerBlocks.Content/>
            </div>
        );
    }
} );
