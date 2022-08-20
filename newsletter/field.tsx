import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { RichText } from '@wordpress/block-editor';
import {
    PanelBody,
    PanelRow,
    ToggleControl
} from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import {
    InspectorControls,
    useBlockProps
} from '@wordpress/block-editor';
import { button } from '@wordpress/icons';
import iconMetadata from '../../blocks/icon/block.json';
import parse from "html-react-parser";

const toKebabCase = ( string ): string => {
    return string.replaceAll( ' ', '-' ).toLowerCase();
}

export const fields = [
    {
        name: '[]meta_input',
        type: 'text',
        label: __( 'Custom', 'blockify' ),
        description: __( 'Displays a custom text input field.', 'blockify' ),
        placeholder: __( 'Placeholder', 'blockify' ),
        icon: button,
    },
    {
        name: 'first_name',
        type: 'text',
        label: __( 'First name', 'blockify' ),
        description: __( 'Displays a first name input field.', 'blockify' ),
        placeholder: __( 'Enter name', 'blockify' ),
        icon: 'admin-users',
    },
    {
        name: 'last_name',
        type: 'text',
        label: __( 'Last name', 'blockify' ),
        description: __( 'Displays a last name input field.', 'blockify' ),
        placeholder: __( 'Enter name', 'blockify' ),
        icon: 'admin-users',
    },
    {
        name: 'user_email',
        type: 'email',
        label: __( 'Email', 'blockify' ),
        description: __( 'Displays an email input field.', 'blockify' ),
        placeholder: __( 'Email address', 'blockify' ),
        icon: 'email',
        //secondary: __( 'Confirm email', 'blockify' ),
        keywords: [
            __( 'Newsletter', 'blockify' ),
            __( 'Sign up', 'blockify' ),
        ]
    },
    {
        name: 'user_url',
        type: 'url',
        label: __( 'URL', 'blockify' ),
        description: __( 'Displays a website URL input field.', 'blockify' ),
        placeholder: __( '', 'blockify' ),
        icon: 'admin-links',
        keywords: [
            __( 'Website', 'blockify' ),
            __( 'Link', 'blockify' ),
        ]
    },
    {
        name: 'user_phone',
        type: 'tel',
        label: __( 'Phone', 'blockify' ),
        description: __( 'Displays a phone number input field.', 'blockify' ),
        placeholder: __( '', 'blockify' ),
        icon: 'phone',
        keywords: [
            __( 'Telephone', 'blockify' ),
            __( 'Call', 'blockify' ),
            __( 'Mobile', 'blockify' ),
            __( 'Number', 'blockify' ),
        ]
    },
    {
        type: 'number',
        label: __( 'Number', 'blockify' ),
        description: __( 'Displays a number input field.', 'blockify' ),
        placeholder: __( '', 'blockify' ),
        icon: 'sort',
    },
    {
        name: 'user_pass',
        type: 'password',
        label: __( 'Password', 'blockify' ),
        description: __( 'Displays a password input field.', 'blockify' ),
        placeholder: __( '', 'blockify' ),
        icon: 'ellipsis',
        //secondary: __( 'Confirm password', 'blockify' ),
        keywords: [
            __( 'User', 'blockify' ),
        ]
    },
    {
        name: 'description',
        type: 'textarea',
        label: __( 'Text Area', 'blockify' ),
        description: __( 'Displays a custom text area field.', 'blockify' ),
        placeholder: __( 'Leave a message', 'blockify' ),
        icon: button,
    },
];

const defaultKeywords = [
    __( 'Form', 'blockify' ),
    __( 'Input', 'blockify' ),
];

const supports = {
    multiple: false,
    color: {
        gradients: true,
        background: true,
        text: true,
    },
    spacing: {
        margin: true,
        padding: true,
        blockGap: true,
    },
    __experimentalBorder: {
        width: true,
        style: true,
        color: true,
        radius: true,
        __experimentalDefaultControls: {
            width: true,
            color: true
        }
    },
    typography: {
        fontSize: true,
        lineHeight: true,
    },
};

const attributes = {
    styles: {
        type: 'object'
    },
    style: {
        type: 'object',
        default: {
            color: {
                background: 'var(--wp--preset--color--white)'
            },
            spacing: {
                padding: {
                    top: '1em',
                    right: '1em',
                    bottom: '1em',
                    left: '1em',
                }
            },
            border: {
                color: 'var(--wp--custom--border--color)',
                radius: 'var(--wp--custom--border--radius)',
                style: 'var(--wp--custom--border--style)',
                width: 'var(--wp--custom--border--width)'
            },
            typography: {
                fontSize: '1em',
                lineHeight: '1',
            },
        }
    },
    name: {
        type: 'string',
        default: 'input',
    },
    placeholder: {
        type: 'string',
    },
    secondary: {
        type: 'string',
    },
    label: {
        type: 'string',
    },
    showLabel: {
        type: 'boolean',
        default: false
    },
    showSecondary: {
        type: 'boolean',
        default: false
    },
    showIcon: {
        type: "boolean",
        default: false
    },
    textAlign: {
        type: 'string',
        default: 'none'
    },
    isRequired: {
        type: 'boolean',
        default: false
    },
    icon: {
        type: 'string',
        default: iconMetadata.attributes.svgString.default
    }
}

const getInputClass = ( blockProps, field ) => {
    let inputClass = blockProps.className;

    inputClass = inputClass.replace( 'wp-block-blockify-' + field.label.toLowerCase(), ' ' );
    inputClass = inputClass.replace( ' wp-block ', ' ' );
    inputClass = 'blockify-form-input ' + inputClass.replaceAll( '  ', '' );

    return inputClass;
}

const getInputStyle = blockStyle => {
    let inputStyle = blockStyle;

    delete inputStyle.margin;
    delete inputStyle.marginTop;
    delete inputStyle.marginRight;
    delete inputStyle.marginBottom;
    delete inputStyle.marginLeft;

    return inputStyle;
}

const Edit = ( props, field ) => {
    const {
              attributes,
              setAttributes
          }          = props;
    const {
              showLabel,
              showIcon,
              icon,
              isRequired,
              placeholder,
              secondary,
              showSecondary,
              style
          }          = attributes;
    const blockProps = {
        ...useBlockProps(),
        'data-showlabel': showLabel,
        'data-showicon': showIcon,
        'data-required': isRequired
    };

    let { icons } = useSelect( select => {
        return {
            icons: select( 'blockify/icons' ).getIcons(),
        };
    }, [] );

    if ( 'font-awesome-regular' in icons ) {
        setAttributes( {
            icon: icons['font-awesome-regular']['envelope']
        } );
    }

    return (
        <>
            <InspectorControls key="settings">
                <PanelBody title={ field.label + ' settings' } className={ 'blockify-input-settings' }>
                    <PanelRow>
                        <ToggleControl
                            label={ __( 'Show Label', 'blockify' ) }
                            checked={ showLabel }
                            onChange={ val => {
                                setAttributes( {
                                    showLabel: val
                                } );
                            } }
                        />
                    </PanelRow>
                    { field?.secondary &&
					  <PanelRow>
						  <ToggleControl
							  label={ field.secondary + __( ' field', 'blockify' ) }
							  checked={ showSecondary }
							  onChange={ val => {
                                  setAttributes( {
                                      showSecondary: val
                                  } );
                              } }
						  />
					  </PanelRow>
                    }
                    <PanelRow>
                        <ToggleControl
                            label={ __( 'Show icon', 'blockify' ) }
                            checked={ showIcon }
                            onChange={ val => {
                                setAttributes( {
                                    showIcon: val
                                } );
                            } }
                        />
                    </PanelRow>
                    <PanelRow>
                        <ToggleControl
                            label={ __( 'Required', 'blockify' ) }
                            checked={ isRequired }
                            onChange={ ( val ) => {
                                setAttributes( {
                                    isRequired: val
                                } );
                            } }
                        />
                    </PanelRow>
                </PanelBody>
            </InspectorControls>

            <div
                { ...blockProps }
                className={ blockProps.className + ' blockify-form-field' }
                style={ {
                    gap: style?.spacing?.blockGap,
                    marginTop: style?.spacing?.margin?.top,
                    marginRight: style?.spacing?.margin?.right,
                    marginBottom: style?.spacing?.margin?.bottom,
                    marginLeft: style?.spacing?.margin?.left,
                } }
            >
                { showLabel &&
				  <RichText
					  tagName={ 'label' }
					  className={ 'blockify-form-label' }
					  htmlFor={ field.name }
					  value={ ( attributes.label ?? field.label ) + ( attributes.isRequired ? '*' : '' ) }
					  onChange={ ( val ) => setAttributes( {
                          label: val
                      } ) }
				  />
                }
                { showIcon && parse( icon ) }
                <RichText
                    { ...blockProps }
                    className={ 'blockify-form-input wp-block-blockify-' + field.label.toLowerCase() }
                    tagName={ 'span' }
                    type={ field.type }
                    name={ field.name }
                    style={ getInputStyle( blockProps.style ) }
                    placeholder={ placeholder }
                    multiline={ 'textarea' === field.type }
                    allowedFormats={ [
                        'blockify/uppercase',
                        'core/bold',
                        'core/italic'
                    ] }
                    value={ placeholder ?? field.placeholder }
                    onChange={ val => setAttributes( {
                        placeholder: val
                    } ) }
                />
                { ( field?.secondary && showSecondary ) &&
				  <RichText
					  className={ getInputClass( blockProps, field ) }
					  tagName={ 'span' }
					  placeholder={ secondary ?? field.secondary }
					  name={ toKebabCase( field.secondary ) }
					  style={ getInputStyle( blockProps.style ) }
					  allowedFormats={ [
                          'blockify/uppercase',
                          'core/bold',
                          'core/italic'
                      ] }
					  onChange={ ( val ) => setAttributes( {
                          secondary: val
                      } ) }
				  />
                }
            </div>
        </>
    );
};

const Save = ( props, field ) => {
    const { attributes } = props;
    const {
              showLabel,
              icon,
              showIcon,
              isRequired,
              secondary,
              showSecondary,
              placeholder,
              style
          }              = attributes;
    const blockProps     = {
        ...useBlockProps.save(),
        'data-showlabel': showLabel,
        'data-required': isRequired,
        'data-placeholder': placeholder,
        tagName: 'textarea' === field.type ? 'textarea' : 'input',
        type: field.type,
        name: field?.label,
        placeholder: placeholder,
    };

    return (
        <>
            <div
                className={ 'blockify-form-field' }
                style={ {
                    gap: style?.spacing?.blockGap,
                    marginTop: style?.spacing?.margin?.top,
                    marginRight: style?.spacing?.margin?.right,
                    marginBottom: style?.spacing?.margin?.bottom,
                    marginLeft: style?.spacing?.margin?.left
                } }
            >
                { attributes?.showLabel &&
				  <RichText.Content
					  tagName={ 'label' }
					  className={ 'blockify-form-label' }
					  htmlFor={ field.name }
					  value={ ( attributes.label ?? field.label ) + ( attributes.isRequired ? '*' : '' ) }
				  />
                }
                { showIcon && parse( icon ) }
                <RichText.Content
                    { ...blockProps }
                    tagName={ 'textarea' === field?.type ? 'textarea' : 'input' }
                    className={ 'blockify-form-input wp-block-blockify-' + field.label.toLowerCase() }
                    style={ getInputStyle( blockProps.style ) }
                    name={ field.name }
                />
                { ( field?.secondary && showSecondary ) &&
				  <RichText.Content
                      { ...blockProps }
					  className={ getInputClass( blockProps, field ) }
					  name={ toKebabCase( field.secondary ) }
					  placeholder={ secondary ?? field.secondary }
					  style={ getInputStyle( blockProps.style ) }
				  />
                }
            </div>
        </>
    );
};

fields.forEach( field => {
    return (
        registerBlockType( 'blockify/' + field.label.replace( ' ', '-' ).toLowerCase(), {
            apiVersion: 2,
            title: field.label,
            description: field.description,
            icon: field.icon,
            category: 'blockify-newsletter',
            parent: [ 'blockify/newsletter' ],
            keywords: field?.keywords ? [
                ...defaultKeywords,
                ...field.keywords
            ] : defaultKeywords,
            supports: supports,
            attributes: {
                ...attributes,
                placeholder: { default: field.placeholder }
            },
            edit: props => Edit( props, field ),
            save: props => Save( props, field )
        } )
    )
} );
