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


import ApiClient from "../ApiClient";
import ResultDetailResultDetailView from '../model/ResultDetailResultDetailView';

/**
* ResultDetailController service.
* @module api/ResultDetailControllerApi
* @version v1
*/
export default class ResultDetailControllerApi {

    /**
    * Constructs a new ResultDetailControllerApi. 
    * @alias module:api/ResultDetailControllerApi
    * @class
    * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
    * default to {@link module:ApiClient#instance} if unspecified.
    */
    constructor(apiClient) {
        this.apiClient = apiClient || ApiClient.instance;
    }


    /**
     * Callback function to receive the result of the findAllByResultQuiz operation.
     * @callback module:api/ResultDetailControllerApi~findAllByResultQuizCallback
     * @param {String} error Error message, if any.
     * @param {Array.<module:model/ResultDetailResultDetailView>} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * @param {Number} resultQuizId 
     * @param {module:api/ResultDetailControllerApi~findAllByResultQuizCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link Array.<module:model/ResultDetailResultDetailView>}
     */
    findAllByResultQuiz(resultQuizId, callback) {
      let postBody = null;
      // verify the required parameter 'resultQuizId' is set
      if (resultQuizId === undefined || resultQuizId === null) {
        throw new Error("Missing the required parameter 'resultQuizId' when calling findAllByResultQuiz");
      }

      let pathParams = {
      };
      let queryParams = {
        'result_quiz_id': resultQuizId
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = [];
      let contentTypes = [];
      let accepts = ['*/*'];
      let returnType = [ResultDetailResultDetailView];
      return this.apiClient.callApi(
        '/api/v1/result-detail/by-result-quiz', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }


}