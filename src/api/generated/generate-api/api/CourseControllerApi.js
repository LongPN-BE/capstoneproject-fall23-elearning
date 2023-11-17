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
import CourseCourseView from '../model/CourseCourseView';
import CourseRequestCourseView from '../model/CourseRequestCourseView';

/**
* CourseController service.
* @module api/CourseControllerApi
* @version v1
*/
export default class CourseControllerApi {

    /**
    * Constructs a new CourseControllerApi. 
    * @alias module:api/CourseControllerApi
    * @class
    * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
    * default to {@link module:ApiClient#instance} if unspecified.
    */
    constructor(apiClient) {
        this.apiClient = apiClient || ApiClient.instance;
    }


    /**
     * Callback function to receive the result of the deleteCourse operation.
     * @callback module:api/CourseControllerApi~deleteCourseCallback
     * @param {String} error Error message, if any.
     * @param {String} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * @param {Number} id 
     * @param {module:api/CourseControllerApi~deleteCourseCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link String}
     */
    deleteCourse(id, callback) {
      let postBody = null;
      // verify the required parameter 'id' is set
      if (id === undefined || id === null) {
        throw new Error("Missing the required parameter 'id' when calling deleteCourse");
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
      let returnType = 'String';
      return this.apiClient.callApi(
        '/api/v1/course/delete', 'DELETE',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the findAllCourseBySubjectId operation.
     * @callback module:api/CourseControllerApi~findAllCourseBySubjectIdCallback
     * @param {String} error Error message, if any.
     * @param {Array.<module:model/CourseCourseView>} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * @param {Number} subjectId 
     * @param {module:api/CourseControllerApi~findAllCourseBySubjectIdCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link Array.<module:model/CourseCourseView>}
     */
    findAllCourseBySubjectId(subjectId, callback) {
      let postBody = null;
      // verify the required parameter 'subjectId' is set
      if (subjectId === undefined || subjectId === null) {
        throw new Error("Missing the required parameter 'subjectId' when calling findAllCourseBySubjectId");
      }

      let pathParams = {
      };
      let queryParams = {
        'subject-id': subjectId
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['Bearer'];
      let contentTypes = [];
      let accepts = ['*/*'];
      let returnType = [CourseCourseView];
      return this.apiClient.callApi(
        '/api/v1/course/bySubjectId', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the findAllCourseByTeacherId operation.
     * @callback module:api/CourseControllerApi~findAllCourseByTeacherIdCallback
     * @param {String} error Error message, if any.
     * @param {Array.<module:model/CourseCourseView>} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * @param {Number} teacherId 
     * @param {module:api/CourseControllerApi~findAllCourseByTeacherIdCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link Array.<module:model/CourseCourseView>}
     */
    findAllCourseByTeacherId(teacherId, callback) {
      let postBody = null;
      // verify the required parameter 'teacherId' is set
      if (teacherId === undefined || teacherId === null) {
        throw new Error("Missing the required parameter 'teacherId' when calling findAllCourseByTeacherId");
      }

      let pathParams = {
      };
      let queryParams = {
        'teacher-id': teacherId
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['Bearer'];
      let contentTypes = [];
      let accepts = ['*/*'];
      let returnType = [CourseCourseView];
      return this.apiClient.callApi(
        '/api/v1/course/byTeacherId', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the findAllCourseUnEnrolledByStudent operation.
     * @callback module:api/CourseControllerApi~findAllCourseUnEnrolledByStudentCallback
     * @param {String} error Error message, if any.
     * @param {Array.<module:model/CourseCourseView>} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * @param {Number} studentId 
     * @param {String} status 
     * @param {Object} opts Optional parameters
     * @param {String} opts.value  (default to '')
     * @param {module:api/CourseControllerApi~findAllCourseUnEnrolledByStudentCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link Array.<module:model/CourseCourseView>}
     */
    findAllCourseUnEnrolledByStudent(studentId, status, opts, callback) {
      opts = opts || {};
      let postBody = null;
      // verify the required parameter 'studentId' is set
      if (studentId === undefined || studentId === null) {
        throw new Error("Missing the required parameter 'studentId' when calling findAllCourseUnEnrolledByStudent");
      }
      // verify the required parameter 'status' is set
      if (status === undefined || status === null) {
        throw new Error("Missing the required parameter 'status' when calling findAllCourseUnEnrolledByStudent");
      }

      let pathParams = {
      };
      let queryParams = {
        'student_id': studentId,
        'status': status,
        'value': opts['value']
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['Bearer'];
      let contentTypes = [];
      let accepts = ['*/*'];
      let returnType = [CourseCourseView];
      return this.apiClient.callApi(
        '/api/v1/course/un-enrolled-by-student', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getAllCourses operation.
     * @callback module:api/CourseControllerApi~getAllCoursesCallback
     * @param {String} error Error message, if any.
     * @param {Array.<module:model/CourseCourseView>} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * @param {module:api/CourseControllerApi~getAllCoursesCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link Array.<module:model/CourseCourseView>}
     */
    getAllCourses(callback) {
      let postBody = null;

      let pathParams = {
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['Bearer'];
      let contentTypes = [];
      let accepts = ['*/*'];
      let returnType = [CourseCourseView];
      return this.apiClient.callApi(
        '/api/v1/course/courses', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getCourseById operation.
     * @callback module:api/CourseControllerApi~getCourseByIdCallback
     * @param {String} error Error message, if any.
     * @param {module:model/CourseCourseView} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * @param {Number} id 
     * @param {module:api/CourseControllerApi~getCourseByIdCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/CourseCourseView}
     */
    getCourseById(id, callback) {
      let postBody = null;
      // verify the required parameter 'id' is set
      if (id === undefined || id === null) {
        throw new Error("Missing the required parameter 'id' when calling getCourseById");
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
      let returnType = CourseCourseView;
      return this.apiClient.callApi(
        '/api/v1/course/byId', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the saveCourse operation.
     * @callback module:api/CourseControllerApi~saveCourseCallback
     * @param {String} error Error message, if any.
     * @param {module:model/CourseCourseView} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * @param {module:model/CourseRequestCourseView} courseRequestCourseView 
     * @param {module:api/CourseControllerApi~saveCourseCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/CourseCourseView}
     */
    saveCourse(courseRequestCourseView, callback) {
      let postBody = courseRequestCourseView;
      // verify the required parameter 'courseRequestCourseView' is set
      if (courseRequestCourseView === undefined || courseRequestCourseView === null) {
        throw new Error("Missing the required parameter 'courseRequestCourseView' when calling saveCourse");
      }

      let pathParams = {
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['Bearer'];
      let contentTypes = ['application/json'];
      let accepts = ['*/*'];
      let returnType = CourseCourseView;
      return this.apiClient.callApi(
        '/api/v1/course/save', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the searchCourse operation.
     * @callback module:api/CourseControllerApi~searchCourseCallback
     * @param {String} error Error message, if any.
     * @param {Array.<module:model/CourseCourseView>} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * @param {Object} opts Optional parameters
     * @param {String} opts.value  (default to '')
     * @param {Number} opts.minPrice 
     * @param {Number} opts.maxPrice 
     * @param {module:api/CourseControllerApi~searchCourseCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link Array.<module:model/CourseCourseView>}
     */
    searchCourse(opts, callback) {
      opts = opts || {};
      let postBody = null;

      let pathParams = {
      };
      let queryParams = {
        'value': opts['value'],
        'minPrice': opts['minPrice'],
        'maxPrice': opts['maxPrice']
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['Bearer'];
      let contentTypes = [];
      let accepts = ['*/*'];
      let returnType = [CourseCourseView];
      return this.apiClient.callApi(
        '/api/v1/course/search', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }


}
