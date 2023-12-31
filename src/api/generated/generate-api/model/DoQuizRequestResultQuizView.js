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
import DoQuizDetailRequestResultQuizView from './DoQuizDetailRequestResultQuizView';

/**
 * The DoQuizRequestResultQuizView model module.
 * @module model/DoQuizRequestResultQuizView
 * @version v1
 */
class DoQuizRequestResultQuizView {
    /**
     * Constructs a new <code>DoQuizRequestResultQuizView</code>.
     * @alias module:model/DoQuizRequestResultQuizView
     */
    constructor() { 
        
        DoQuizRequestResultQuizView.initialize(this);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj) { 
    }

    /**
     * Constructs a <code>DoQuizRequestResultQuizView</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/DoQuizRequestResultQuizView} obj Optional instance to populate.
     * @return {module:model/DoQuizRequestResultQuizView} The populated <code>DoQuizRequestResultQuizView</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new DoQuizRequestResultQuizView();

            if (data.hasOwnProperty('quizId')) {
                obj['quizId'] = ApiClient.convertToType(data['quizId'], 'Number');
            }
            if (data.hasOwnProperty('enrollId')) {
                obj['enrollId'] = ApiClient.convertToType(data['enrollId'], 'Number');
            }
            if (data.hasOwnProperty('startTime')) {
                obj['startTime'] = ApiClient.convertToType(data['startTime'], 'String');
            }
            if (data.hasOwnProperty('doQuizDetailRequests')) {
                obj['doQuizDetailRequests'] = ApiClient.convertToType(data['doQuizDetailRequests'], [DoQuizDetailRequestResultQuizView]);
            }
        }
        return obj;
    }

    /**
     * Validates the JSON data with respect to <code>DoQuizRequestResultQuizView</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>DoQuizRequestResultQuizView</code>.
     */
    static validateJSON(data) {
        // ensure the json data is a string
        if (data['startTime'] && !(typeof data['startTime'] === 'string' || data['startTime'] instanceof String)) {
            throw new Error("Expected the field `startTime` to be a primitive type in the JSON string but got " + data['startTime']);
        }
        if (data['doQuizDetailRequests']) { // data not null
            // ensure the json data is an array
            if (!Array.isArray(data['doQuizDetailRequests'])) {
                throw new Error("Expected the field `doQuizDetailRequests` to be an array in the JSON data but got " + data['doQuizDetailRequests']);
            }
            // validate the optional field `doQuizDetailRequests` (array)
            for (const item of data['doQuizDetailRequests']) {
                DoQuizDetailRequestResultQuizView.validateJsonObject(item);
            };
        }

        return true;
    }


}



/**
 * @member {Number} quizId
 */
DoQuizRequestResultQuizView.prototype['quizId'] = undefined;

/**
 * @member {Number} enrollId
 */
DoQuizRequestResultQuizView.prototype['enrollId'] = undefined;

/**
 * @member {String} startTime
 */
DoQuizRequestResultQuizView.prototype['startTime'] = undefined;

/**
 * @member {Array.<module:model/DoQuizDetailRequestResultQuizView>} doQuizDetailRequests
 */
DoQuizRequestResultQuizView.prototype['doQuizDetailRequests'] = undefined;






export default DoQuizRequestResultQuizView;

