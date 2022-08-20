import { __ } from '@wordpress/i18n';
import {
    registerBlockType,
} from '@wordpress/blocks';
import './editor.scss';
import metadata from './block.json';
import {
    useBlockProps,
    InspectorControls
} from '@wordpress/block-editor';
import {
    PanelBody,
    PanelRow,
    SelectControl,
    TextControl,
    __experimentalNumberControl as NumberControl
} from '@wordpress/components';

const defaults = {
    start: metadata.attributes.start.default,
    end: metadata.attributes.end.default,
    duration: metadata.attributes.duration.default,
    delay: metadata.attributes.delay.default,
    tag: metadata.attributes.tag.default
};

registerBlockType( metadata, {
    edit: props => {
        const {
                  attributes,
                  setAttributes
              }          = props;
        const blockProps = useBlockProps();
        const Counter    = `${ attributes.tag ?? defaults.tag }`;

        return (
            <>
                <InspectorControls>
                    <PanelBody
                        title={ __( 'Counter Settings', 'blockify' ) }
                        initialOpen={ true }
                        className={ 'blockify-counter-settings' }
                    >
                        <PanelRow>
                            <NumberControl
                                label={ __( 'Start', 'blockify' ) }
                                onChange={ value => {
                                    setAttributes( {
                                        start: value
                                    } );
                                } }
                                step={ 1 }
                                shiftStep={ 10 }
                                isDragEnabled={ true }
                                isShiftStepEnabled={ true }
                                value={ attributes.start ?? defaults.start }
                            />

                        </PanelRow>
                        <PanelRow>
                            <NumberControl
                                label={ __( 'End', 'blockify' ) }
                                onChange={ value => {
                                    setAttributes( {
                                        end: value
                                    } );
                                } }
                                step={ 1 }
                                shiftStep={ 10 }
                                isDragEnabled={ true }
                                isShiftStepEnabled={ true }
                                value={ attributes.end ?? defaults.end }
                            />
                        </PanelRow>
                        <PanelRow>
                            <NumberControl
                                label={ __( 'Duration (seconds)', 'blockify' ) }
                                onChange={ value => {
                                    setAttributes( {
                                        duration: value
                                    } );
                                } }
                                step={ .1 }
                                shiftStep={ 1 }
                                isDragEnabled={ true }
                                isShiftStepEnabled={ true }
                                value={ attributes.duration ?? defaults.duration }
                            />
                        </PanelRow>
                        <PanelRow>
                            <NumberControl
                                label={ __( 'Delay (seconds)', 'blockify' ) }
                                onChange={ value => {
                                    setAttributes( {
                                        delay: value
                                    } );
                                } }
                                step={ .1 }
                                shiftStep={ 1 }
                                isDragEnabled={ true }
                                isShiftStepEnabled={ true }
                                value={ attributes.delay ?? defaults.delay }
                            />
                        </PanelRow>
                        <PanelRow>
                            <SelectControl
                                label={ __( 'HTML Tag', 'blockify' ) }
                                value={ attributes.tag ?? defaults.tag }
                                options={ [
                                    { label: 'span', value: 'span' },
                                    { label: 'strong', value: 'strong' },
                                    { label: 'small', value: 'small' },
                                    { label: 'h1', value: 'h1' },
                                    { label: 'h2', value: 'h2' },
                                    { label: 'h3', value: 'h3' },
                                    { label: 'h4', value: 'h4' },
                                    { label: 'h5', value: 'h5' },
                                    { label: 'h6', value: 'h6' },
                                ] }
                                onChange={ value => setAttributes( {
                                    tag: value
                                } ) }
                                __nextHasNoMarginBottom
                            />
                        </PanelRow>
                        <PanelRow>
                            <TextControl
                                label={__('Suffix', 'blockify')}
                                value={ attributes.suffix ?? '' }
                                onChange={ value => setAttributes( {
                                    suffix: value
                                } ) }
                            />
                        </PanelRow>
                    </PanelBody>
                </InspectorControls>
                <Counter
                    { ...blockProps }
                    className={ blockProps.className }
                    data-start={ attributes.start ?? defaults.start }
                    data-end={ attributes.end ?? defaults.end }
                    data-duration={ attributes.duration ?? defaults.duration }
                    data-delay={ attributes.delay ?? defaults.delay }
                    data-suffix={ attributes.suffix ?? '' }
                    tagName={ attributes.tag ?? defaults.tag }
                    value={ attributes.start ?? defaults.start }
                >
                    { attributes.end ?? defaults.end }
                </Counter>
            </>
        );
    },

    save: props => {
        const { attributes } = props;
        const blockProps     = useBlockProps.save();
        const Counter        = `${ attributes.tag ?? defaults.tag }`;

        return (
            <Counter
                { ...blockProps }
                className={ blockProps.className }
                data-start={ attributes.start ?? defaults.start }
                data-end={ attributes.end ?? defaults.end }
                data-duration={ attributes.duration ?? defaults.duration }
                data-delay={ attributes.delay ?? defaults.delay }
                data-suffix={ attributes.suffix ?? '' }
                tagName={ attributes.tag ?? defaults.tag }
                value={ attributes.start ?? defaults.start }
            >
                { attributes.end ?? defaults.start }
            </Counter>
        );
    }
} );
