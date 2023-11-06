/**
 * FPT SE OnLearn management API
 * FPT OnLearn Management API
 *
 * The version of the OpenAPI document: v1
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

import ApiClient from '../ApiClient';

/**
 * The FeedContentFeedbackView model module.
 * @module model/FeedContentFeedbackView
 * @version v1
 */
class FeedContentFeedbackView {
    /**
     * Constructs a new <code>FeedContentFeedbackView</code>.
     * @alias module:model/FeedContentFeedbackView
     */
    constructor() { 
        
        FeedContentFeedbackView.initialize(this);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj) { 
    }

    /**
     * Constructs a <code>FeedContentFeedbackView</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/FeedContentFeedbackView} obj Optional instance to populate.
     * @return {module:model/FeedContentFeedbackView} The populated <code>FeedContentFeedbackView</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new FeedContentFeedbackView();

            if (data.hasOwnProperty('id')) {
                obj['id'] = ApiClient.convertToType(data['id'], 'Number');
            }
            if (data.hasOwnProperty('content')) {
                obj['content'] = ApiClient.convertToType(data['content'], 'String');
            }
        }
        return obj;
    }

    /**
     * Validates the JSON data with respect to <code>FeedContentFeedbackView</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>FeedContentFeedbackView</code>.
     */
    static validateJSON(data) {
        // ensure the json data is a string
        if (data['content'] && !(typeof data['content'] === 'string' || data['content'] instanceof String)) {
            throw new Error("Expected the field `content` to be a primitive type in the JSON string but got " + data['content']);
        }

        return true;
    }


}



/**
 * @member {Number} id
 */
FeedContentFeedbackView.prototype['id'] = undefined;

/**
 * @member {String} content
 */
FeedContentFeedbackView.prototype['content'] = undefined;






export default FeedContentFeedbackView;

