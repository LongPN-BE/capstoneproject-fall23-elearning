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
import ResultQuizResultDetailView from './ResultQuizResultDetailView';
import UsedAnswerResponseResultDetailView from './UsedAnswerResponseResultDetailView';
import UsedQuestionResultDetailView from './UsedQuestionResultDetailView';

/**
 * The ResultDetailResponseResultDetailView model module.
 * @module model/ResultDetailResponseResultDetailView
 * @version v1
 */
class ResultDetailResponseResultDetailView {
    /**
     * Constructs a new <code>ResultDetailResponseResultDetailView</code>.
     * @alias module:model/ResultDetailResponseResultDetailView
     */
    constructor() { 
        
        ResultDetailResponseResultDetailView.initialize(this);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj) { 
    }

    /**
     * Constructs a <code>ResultDetailResponseResultDetailView</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/ResultDetailResponseResultDetailView} obj Optional instance to populate.
     * @return {module:model/ResultDetailResponseResultDetailView} The populated <code>ResultDetailResponseResultDetailView</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new ResultDetailResponseResultDetailView();

            if (data.hasOwnProperty('id')) {
                obj['id'] = ApiClient.convertToType(data['id'], 'Number');
            }
            if (data.hasOwnProperty('resultQuiz')) {
                obj['resultQuiz'] = ResultQuizResultDetailView.constructFromObject(data['resultQuiz']);
            }
            if (data.hasOwnProperty('usedQuestion')) {
                obj['usedQuestion'] = UsedQuestionResultDetailView.constructFromObject(data['usedQuestion']);
            }
            if (data.hasOwnProperty('usedAnswerResponses')) {
                obj['usedAnswerResponses'] = ApiClient.convertToType(data['usedAnswerResponses'], [UsedAnswerResponseResultDetailView]);
            }
            if (data.hasOwnProperty('isCorrect')) {
                obj['isCorrect'] = ApiClient.convertToType(data['isCorrect'], 'Boolean');
            }
        }
        return obj;
    }

    /**
     * Validates the JSON data with respect to <code>ResultDetailResponseResultDetailView</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>ResultDetailResponseResultDetailView</code>.
     */
    static validateJSON(data) {
        // validate the optional field `resultQuiz`
        if (data['resultQuiz']) { // data not null
          ResultQuizResultDetailView.validateJSON(data['resultQuiz']);
        }
        // validate the optional field `usedQuestion`
        if (data['usedQuestion']) { // data not null
          UsedQuestionResultDetailView.validateJSON(data['usedQuestion']);
        }
        if (data['usedAnswerResponses']) { // data not null
            // ensure the json data is an array
            if (!Array.isArray(data['usedAnswerResponses'])) {
                throw new Error("Expected the field `usedAnswerResponses` to be an array in the JSON data but got " + data['usedAnswerResponses']);
            }
            // validate the optional field `usedAnswerResponses` (array)
            for (const item of data['usedAnswerResponses']) {
                UsedAnswerResponseResultDetailView.validateJsonObject(item);
            };
        }

        return true;
    }


}



/**
 * @member {Number} id
 */
ResultDetailResponseResultDetailView.prototype['id'] = undefined;

/**
 * @member {module:model/ResultQuizResultDetailView} resultQuiz
 */
ResultDetailResponseResultDetailView.prototype['resultQuiz'] = undefined;

/**
 * @member {module:model/UsedQuestionResultDetailView} usedQuestion
 */
ResultDetailResponseResultDetailView.prototype['usedQuestion'] = undefined;

/**
 * @member {Array.<module:model/UsedAnswerResponseResultDetailView>} usedAnswerResponses
 */
ResultDetailResponseResultDetailView.prototype['usedAnswerResponses'] = undefined;

/**
 * @member {Boolean} isCorrect
 */
ResultDetailResponseResultDetailView.prototype['isCorrect'] = undefined;






export default ResultDetailResponseResultDetailView;

