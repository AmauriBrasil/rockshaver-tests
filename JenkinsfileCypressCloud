pipeline {
  agent {
    docker { 
		image 'cypress/browsers:node-22.12.0-chrome-131.0.6778.139-1-ff-133.0.3-edge-131.0.2903.99-1'
			args '-u root --network rockshaver_skynet'
			}
  }
  stages {
    	stage('API ') {
      	steps {
        	dir('api') {
						sh 'npm install'
						sh 'npx cypress install --force'
						sh 'npx cypress run --record --key 778d825c-55a8-4e41-aea7-a549889306f2'
					}
      			}
    	}

		stage('Mobile') {
			steps {
				dir('mobile') {
						sh 'npm install'
						sh 'npx cypress install --force'
						sh 'npx cypress run --record --key 767a1318-eeb8-463a-b44d-965168bb4f33'
				}
			}
		}

		stage('Web') {
			steps {
				dir('web') {
						sh 'npm install'
						sh 'npx cypress install --force'
						sh 'npx cypress run --browser chrome --record --key f67cf26c-2cbe-4780-95f9-d471b67c3b07'
				}
			}
		}
  }
}
