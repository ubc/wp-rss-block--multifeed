const { Button } = wp.components;
import UrlControl from './js/url-control';

const addAdditionalAttribute = ( settings, name ) => {

  if ( 'ubc/ctlt-rss' !== name ) {
    return settings;
  }

  return {
      ...settings,
      attributes: {
          ...settings.attributes,
          additionalFeeds: {
              type: 'array',
              default: []
          }
      }
  }
}
const addMultiFeedFeature = ( children, props ) => {
  const { name, attributes, setAttributes } = props;
  const { additionalFeeds } = attributes;

  if( 'ubc/ctlt-rss' !== name ) {
      return;
  }

  return (
    <>
      { children }
      <div className='rss-multifeed--urls'>
        { additionalFeeds.map( ( feed, index ) => (
          <UrlControl
            key={ index }
            url={ feed }
            onChange={ ( url ) => {
              let newFeed = [ ...additionalFeeds ];
              newFeed[ index ] = url;
              setAttributes( {
                additionalFeeds: newFeed
              } );
            } }
            onDelete={ () => {
              let newFeed = [ ...additionalFeeds ];
              newFeed.splice( index, 1 );
              setAttributes( {
                additionalFeeds: newFeed
              } );
            } }
          />
        ) ) }
      </div>
      <Button
        variant="primary"
        size="small"
        style={ { 'margin': '10px 0' } }
        onClick={ () => {
          setAttributes( {
            additionalFeeds: [ ...additionalFeeds, '' ]
          } );
        }}
      >Add Feed</Button>
    </>
  );
};

const filterSetData = ( source, attributes ) => {
  const { additionalFeeds } = attributes;
  return [ source, ...additionalFeeds ];
}

wp.hooks.addFilter(
  'blocks.registerBlockType',
  'wp-rss-block/multifeed',
  addAdditionalAttribute
);

wp.hooks.addFilter(
  'ctlt-rss-block.settings',
  'wp-rss-block/multifeed',
  addMultiFeedFeature
);

wp.hooks.addFilter(
  'ctlt-rss-block.setData',
  'wp-rss-block/multifeed',
  filterSetData
);