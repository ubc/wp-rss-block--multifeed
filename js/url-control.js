const { TextControl } = wp.components;
const { useEffect } = wp.element;

import { Icon, check, close, trash } from '@wordpress/icons';

import '../css/url-control.scss';

const ICON_STYLES = {
    'fill': '#fff',
    'width': '25px',
    'height': '25px',
    'borderRadius': '50%',
};

const isValidHttpsUrl = (string) => {
	try {
	  const newUrl = new URL(string);
	  return newUrl.protocol === 'https:';
	} catch (err) {
	  return false;
	}
}

const UrlControl = props => {
    const { url, onChange, onDelete } = props;

    useEffect(
        () => {
            onChange( url );
        },
        [ url ]
    );

    return (
        <>
            <div className="rss-multifeed-url-control">
                <TextControl
                    value={ url }
                    onChange={ onChange }
                    className='rss-url-control__input'
                />
                <Icon
                    icon={trash}
                    onClick={() => onDelete()}
                    style={{
                        ...ICON_STYLES,
                        'fill': 'auto',
                        'background': 'none',
                        'cursor': 'pointer'
                    }}
                />
                { isValidHttpsUrl( url ) ? 
                    <Icon
                        icon={check}
                        style={{
                            ...ICON_STYLES,
                            'padding': '2px',
                            'background': 'green'
                        }}
                    /> :
                    <Icon
                        icon={close}
                        style={{
                            ...ICON_STYLES,
                            'padding': '5px',
                            'background': 'red'
                        }}
                    />
                }
            </div>
        </>

    );
}

export default UrlControl;