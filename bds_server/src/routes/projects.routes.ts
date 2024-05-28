import { Router } from 'express'
import projectsControllers from '~/controllers/projects.controllers'
import commonMiddlewares from '~/middlewares/common.middleware'
import projectsMiddlewares from '~/middlewares/projects.middleware'

const projectRoutes = Router()

/**
 * description: Create a new project
 * method: POST
 * path: /projects/create
 * body: {REQUEST_BODY_PROJECT}
 */
projectRoutes.post(
  '/create',
  commonMiddlewares.accessTokenValidator,
  projectsMiddlewares.createProjectValidator,
  projectsControllers.createProject
)

/**
 * description: Update a project by id
 * method: PUT
 * path: /projects/:id
 * body: {REQUEST_BODY_PROJECT}
 * params: id
 */
projectRoutes.put(
  '/:id',
  commonMiddlewares.accessTokenValidator,
  projectsMiddlewares.createProjectValidator,
  projectsControllers.updateProject
)
/**
 * description: Get all projects
 * method: GET
 * path: /projects
 */
projectRoutes.get('/', projectsControllers.getProjects)

/**
 * description: Get a project by id
 * method: GET
 * path: /projects/:id
 */
projectRoutes.get('/:id', projectsControllers.getProjectById)

/**
 * description: Delete a project by id
 * method: DELETE
 * path: /projects/:id
 */
projectRoutes.delete('/:id', projectsControllers.deleteProjectById)
/**
 * description: Delete many projects by ids
 * method: DELETE
 * path: /projects/delete-many
 */
projectRoutes.delete('/delete-many', projectsControllers.deleteManyProjects)

/**
 * description: Delete all projects
 * method: DELETE
 * path: /projects/delete-all
 */
projectRoutes.delete('/delete-all', projectsControllers.deleteAllProjects)
export default projectRoutes
