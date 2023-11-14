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
import EnrollResultDetailView from './EnrollResultDetailView';
import QuizResultDetailView from './QuizResultDetailView';
import ResultDetailResultDetailView from './ResultDetailResultDetailView';

/**
 * The ResultQuizResultDetailView model module.
 * @module model/ResultQuizResultDetailView
 * @version v1
 */
class ResultQuizResultDetailView {
    /**
     * Constructs a new <code>ResultQuizResultDetailView</code>.
     * @alias module:model/ResultQuizResultDetailView
     */
    constructor() { 
        
        ResultQuizResultDetailView.initialize(this);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj) { 
    }

    /**
     * Constructs a <code>ResultQuizResultDetailView</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/ResultQuizResultDetailView} obj Optional instance to populate.
     * @return {module:model/ResultQuizResultDetailView} The populated <code>ResultQuizResultDetailView</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new ResultQuizResultDetailView();

            if (data.hasOwnProperty('id')) {
                obj['id'] = ApiClient.convertToType(data['id'], 'Number');
            }
            if (data.hasOwnProperty('startTime')) {
                obj['startTime'] = ApiClient.convertToType(data['startTime'], 'Date');
            }
            if (data.hasOwnProperty('submitTime')) {
                obj['submitTime'] = ApiClient.convertToType(data['submitTime'], 'Date');
            }
            if (data.hasOwnProperty('resultStatus')) {
                obj['resultStatus'] = ApiClient.convertToType(data['resultStatus'], 'String');
            }
            if (data.hasOwnProperty('lastPoint')) {
                obj['lastPoint'] = ApiClient.convertToType(data['lastPoint'], 'Number');
            }
            if (data.hasOwnProperty('processTime')) {
                obj['processTime'] = ApiClient.convertToType(data['processTime'], 'Number');
            }
            if (data.hasOwnProperty('student')) {
                obj['student'] = ApiClient.convertToType(data['student'], Object);
            }
            if (data.hasOwnProperty('enroll')) {
                obj['enroll'] = EnrollResultDetailView.constructFromObject(data['enroll']);
            }
            if (data.hasOwnProperty('quiz')) {
                obj['quiz'] = QuizResultDetailView.constructFromObject(data['quiz']);
            }
            if (data.hasOwnProperty('resultDetails')) {
                obj['resultDetails'] = ApiClient.convertToType(data['resultDetails'], [ResultDetailResultDetailView]);
            }
        }
        return obj;
    }

    /**
     * Validates the JSON data with respect to <code>ResultQuizResultDetailView</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>ResultQuizResultDetailView</code>.
     */
    static validateJSON(data) {
        // ensure the json data is a string
        if (data['resultStatus'] && !(typeof data['resultStatus'] === 'string' || data['resultStatus'] instanceof String)) {
            throw new Error("Expected the field `resultStatus` to be a primitive type in the JSON string but got " + data['resultStatus']);
        }
        // validate the optional field `enroll`
        if (data['enroll']) { // data not null
          EnrollResultDetailView.validateJSON(data['enroll']);
        }
        // validate the optional field `quiz`
        if (data['quiz']) { // data not null
          QuizResultDetailView.validateJSON(data['quiz']);
        }
        if (data['resultDetails']) { // data not null
            // ensure the json data is an array
            if (!Array.isArray(data['resultDetails'])) {
                throw new Error("Expected the field `resultDetails` to be an array in the JSON data but got " + data['resultDetails']);
            }
            // validate the optional field `resultDetails` (array)
            for (const item of data['resultDetails']) {
                ResultDetailResultDetailView.validateJsonObject(item);
            };
        }

        return true;
    }


}



/**
 * @member {Number} id
 */
ResultQuizResultDetailView.prototype['id'] = undefined;

/**
 * @member {Date} startTime
 */
ResultQuizResultDetailView.prototype['startTime'] = undefined;

/**
 * @member {Date} submitTime
 */
ResultQuizResultDetailView.prototype['submitTime'] = undefined;

/**
 * @member {String} resultStatus
 */
ResultQuizResultDetailView.prototype['resultStatus'] = undefined;

/**
 * @member {Number} lastPoint
 */
ResultQuizResultDetailView.prototype['lastPoint'] = undefined;

/**
 * @member {Number} processTime
 */
ResultQuizResultDetailView.prototype['processTime'] = undefined;

/**
 * @member {Object} student
 */
ResultQuizResultDetailView.prototype['student'] = undefined;

/**
 * @member {module:model/EnrollResultDetailView} enroll
 */
ResultQuizResultDetailView.prototype['enroll'] = undefined;

/**
 * @member {module:model/QuizResultDetailView} quiz
 */
ResultQuizResultDetailView.prototype['quiz'] = undefined;

/**
 * @member {Array.<module:model/ResultDetailResultDetailView>} resultDetails
 */
ResultQuizResultDetailView.prototype['resultDetails'] = undefined;






export default ResultQuizResultDetailView;

