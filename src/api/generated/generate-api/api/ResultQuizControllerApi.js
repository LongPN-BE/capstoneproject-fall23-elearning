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
import ResultQuizResultQuizView from '../model/ResultQuizResultQuizView';

/**
* ResultQuizController service.
* @module api/ResultQuizControllerApi
* @version v1
*/
export default class ResultQuizControllerApi {

    /**
    * Constructs a new ResultQuizControllerApi. 
    * @alias module:api/ResultQuizControllerApi
    * @class
    * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
    * default to {@link module:ApiClient#instance} if unspecified.
    */
    constructor(apiClient) {
        this.apiClient = apiClient || ApiClient.instance;
    }


    /**
     * Callback function to receive the result of the findAllByStudentAndCourse operation.
     * @callback module:api/ResultQuizControllerApi~findAllByStudentAndCourseCallback
     * @param {String} error Error message, if any.
     * @param {Array.<module:model/ResultQuizResultQuizView>} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * @param {Number} studentId 
     * @param {Number} courseId 
     * @param {module:api/ResultQuizControllerApi~findAllByStudentAndCourseCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link Array.<module:model/ResultQuizResultQuizView>}
     */
    findAllByStudentAndCourse(studentId, courseId, callback) {
      let postBody = null;
      // verify the required parameter 'studentId' is set
      if (studentId === undefined || studentId === null) {
        throw new Error("Missing the required parameter 'studentId' when calling findAllByStudentAndCourse");
      }
      // verify the required parameter 'courseId' is set
      if (courseId === undefined || courseId === null) {
        throw new Error("Missing the required parameter 'courseId' when calling findAllByStudentAndCourse");
      }

      let pathParams = {
      };
      let queryParams = {
        'student_id': studentId,
        'course_id': courseId
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['Bearer'];
      let contentTypes = [];
      let accepts = ['*/*'];
      let returnType = [ResultQuizResultQuizView];
      return this.apiClient.callApi(
        '/api/v1/result-quiz/by-student-course', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the findAllByStudentId operation.
     * @callback module:api/ResultQuizControllerApi~findAllByStudentIdCallback
     * @param {String} error Error message, if any.
     * @param {Array.<module:model/ResultQuizResultQuizView>} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * @param {Number} studentId 
     * @param {Number} quizId 
     * @param {module:api/ResultQuizControllerApi~findAllByStudentIdCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link Array.<module:model/ResultQuizResultQuizView>}
     */
    findAllByStudentId(studentId, quizId, callback) {
      let postBody = null;
      // verify the required parameter 'studentId' is set
      if (studentId === undefined || studentId === null) {
        throw new Error("Missing the required parameter 'studentId' when calling findAllByStudentId");
      }
      // verify the required parameter 'quizId' is set
      if (quizId === undefined || quizId === null) {
        throw new Error("Missing the required parameter 'quizId' when calling findAllByStudentId");
      }

      let pathParams = {
      };
      let queryParams = {
        'student_id': studentId,
        'quiz_id': quizId
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['Bearer'];
      let contentTypes = [];
      let accepts = ['*/*'];
      let returnType = [ResultQuizResultQuizView];
      return this.apiClient.callApi(
        '/api/v1/result-quiz/by-student-id', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the findResultQuizById operation.
     * @callback module:api/ResultQuizControllerApi~findResultQuizByIdCallback
     * @param {String} error Error message, if any.
     * @param {module:model/ResultQuizResultQuizView} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * @param {Number} id 
     * @param {module:api/ResultQuizControllerApi~findResultQuizByIdCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/ResultQuizResultQuizView}
     */
    findResultQuizById(id, callback) {
      let postBody = null;
      // verify the required parameter 'id' is set
      if (id === undefined || id === null) {
        throw new Error("Missing the required parameter 'id' when calling findResultQuizById");
      }

      let pathParams = {
      };
      let queryParams = {
        'id': id
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['Bearer'];
      let contentTypes = [];
      let accepts = ['*/*'];
      let returnType = ResultQuizResultQuizView;
      return this.apiClient.callApi(
        '/api/v1/result-quiz/by-id', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the findResultQuizByQuizId operation.
     * @callback module:api/ResultQuizControllerApi~findResultQuizByQuizIdCallback
     * @param {String} error Error message, if any.
     * @param {Array.<module:model/ResultQuizResultQuizView>} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * @param {Number} quizId 
     * @param {module:api/ResultQuizControllerApi~findResultQuizByQuizIdCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link Array.<module:model/ResultQuizResultQuizView>}
     */
    findResultQuizByQuizId(quizId, callback) {
      let postBody = null;
      // verify the required parameter 'quizId' is set
      if (quizId === undefined || quizId === null) {
        throw new Error("Missing the required parameter 'quizId' when calling findResultQuizByQuizId");
      }

      let pathParams = {
      };
      let queryParams = {
        'quiz_id': quizId
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['Bearer'];
      let contentTypes = [];
      let accepts = ['*/*'];
      let returnType = [ResultQuizResultQuizView];
      return this.apiClient.callApi(
        '/api/v1/result-quiz/by-quiz', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }


}
