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
 * The DoQuizDetailRequestResultQuizView model module.
 * @module model/DoQuizDetailRequestResultQuizView
 * @version v1
 */
class DoQuizDetailRequestResultQuizView {
    /**
     * Constructs a new <code>DoQuizDetailRequestResultQuizView</code>.
     * @alias module:model/DoQuizDetailRequestResultQuizView
     */
    constructor() { 
        
        DoQuizDetailRequestResultQuizView.initialize(this);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj) { 
    }

    /**
     * Constructs a <code>DoQuizDetailRequestResultQuizView</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/DoQuizDetailRequestResultQuizView} obj Optional instance to populate.
     * @return {module:model/DoQuizDetailRequestResultQuizView} The populated <code>DoQuizDetailRequestResultQuizView</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new DoQuizDetailRequestResultQuizView();

            if (data.hasOwnProperty('questionId')) {
                obj['questionId'] = ApiClient.convertToType(data['questionId'], 'Number');
            }
            if (data.hasOwnProperty('answerIds')) {
                obj['answerIds'] = ApiClient.convertToType(data['answerIds'], ['Number']);
            }
        }
        return obj;
    }

    /**
     * Validates the JSON data with respect to <code>DoQuizDetailRequestResultQuizView</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>DoQuizDetailRequestResultQuizView</code>.
     */
    static validateJSON(data) {
        // ensure the json data is an array
        if (!Array.isArray(data['answerIds'])) {
            throw new Error("Expected the field `answerIds` to be an array in the JSON data but got " + data['answerIds']);
        }

        return true;
    }


}



/**
 * @member {Number} questionId
 */
DoQuizDetailRequestResultQuizView.prototype['questionId'] = undefined;

/**
 * @member {Array.<Number>} answerIds
 */
DoQuizDetailRequestResultQuizView.prototype['answerIds'] = undefined;






export default DoQuizDetailRequestResultQuizView;

