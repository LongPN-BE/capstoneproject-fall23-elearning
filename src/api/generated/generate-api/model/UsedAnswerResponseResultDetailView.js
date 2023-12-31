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
import UsedQuestionResultDetailView from './UsedQuestionResultDetailView';

/**
 * The UsedAnswerResponseResultDetailView model module.
 * @module model/UsedAnswerResponseResultDetailView
 * @version v1
 */
class UsedAnswerResponseResultDetailView {
    /**
     * Constructs a new <code>UsedAnswerResponseResultDetailView</code>.
     * @alias module:model/UsedAnswerResponseResultDetailView
     */
    constructor() { 
        
        UsedAnswerResponseResultDetailView.initialize(this);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj) { 
    }

    /**
     * Constructs a <code>UsedAnswerResponseResultDetailView</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/UsedAnswerResponseResultDetailView} obj Optional instance to populate.
     * @return {module:model/UsedAnswerResponseResultDetailView} The populated <code>UsedAnswerResponseResultDetailView</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new UsedAnswerResponseResultDetailView();

            if (data.hasOwnProperty('id')) {
                obj['id'] = ApiClient.convertToType(data['id'], 'Number');
            }
            if (data.hasOwnProperty('content')) {
                obj['content'] = ApiClient.convertToType(data['content'], 'String');
            }
            if (data.hasOwnProperty('isCorrect')) {
                obj['isCorrect'] = ApiClient.convertToType(data['isCorrect'], 'Boolean');
            }
            if (data.hasOwnProperty('isChoose')) {
                obj['isChoose'] = ApiClient.convertToType(data['isChoose'], 'Boolean');
            }
            if (data.hasOwnProperty('usedQuestion')) {
                obj['usedQuestion'] = UsedQuestionResultDetailView.constructFromObject(data['usedQuestion']);
            }
        }
        return obj;
    }

    /**
     * Validates the JSON data with respect to <code>UsedAnswerResponseResultDetailView</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>UsedAnswerResponseResultDetailView</code>.
     */
    static validateJSON(data) {
        // ensure the json data is a string
        if (data['content'] && !(typeof data['content'] === 'string' || data['content'] instanceof String)) {
            throw new Error("Expected the field `content` to be a primitive type in the JSON string but got " + data['content']);
        }
        // validate the optional field `usedQuestion`
        if (data['usedQuestion']) { // data not null
          UsedQuestionResultDetailView.validateJSON(data['usedQuestion']);
        }

        return true;
    }


}



/**
 * @member {Number} id
 */
UsedAnswerResponseResultDetailView.prototype['id'] = undefined;

/**
 * @member {String} content
 */
UsedAnswerResponseResultDetailView.prototype['content'] = undefined;

/**
 * @member {Boolean} isCorrect
 */
UsedAnswerResponseResultDetailView.prototype['isCorrect'] = undefined;

/**
 * @member {Boolean} isChoose
 */
UsedAnswerResponseResultDetailView.prototype['isChoose'] = undefined;

/**
 * @member {module:model/UsedQuestionResultDetailView} usedQuestion
 */
UsedAnswerResponseResultDetailView.prototype['usedQuestion'] = undefined;






export default UsedAnswerResponseResultDetailView;

