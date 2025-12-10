pipeline {
    agent any

    environment {
        IMAGE_NAME = "jenkins-cicd-sample-app"
    }

    tools {
        nodejs 'NodeJS 20'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                sh "docker build -t ${IMAGE_NAME} ."
            }
        }

        stage('Deploy') {
            when {
                anyOf {
                    branch 'main'
                    branch 'develop'
                    pattern 'feature/.*'
                    pattern 'release/.*'
                    pattern 'hotfix/.*'
                }
            }
            steps {
                script {

                    // Decide target container name/port by branch pattern
                    def target = ''
                    if (env.BRANCH_NAME == 'main') {
                        target = 'uat_app'
                    } else if (
                        env.BRANCH_NAME == 'develop' ||
                        env.BRANCH_NAME.startsWith('release/') ||
                        env.BRANCH_NAME.startsWith('hotfix/')
                    ) {
                        target = 'qa_app'
                    } else if (env.BRANCH_NAME.startsWith('feature/')) {
                        target = 'dev_app'
                    } else {
                        target = 'dev_app'
                    }

                    // Stop existing container (ignore failure)
                    sh "docker rm -f ${target} || true"

                    // Deploy based on target
                    if (target == 'dev_app') {
                        sh "docker run -d --name dev_app -e ENV_NAME=DEV -p 3100:3000 ${IMAGE_NAME}"
                    } else if (target == 'qa_app') {
                        sh "docker run -d --name qa_app -e ENV_NAME=QA -p 3200:3000 ${IMAGE_NAME}"
                    } else if (target == 'uat_app') {
                        sh "docker run -d --name uat_app -e ENV_NAME=UAT -p 3300:3000 ${IMAGE_NAME}"
                    }

                    echo "Deployed ${IMAGE_NAME} to ${target}"
                }
            }
        }
    }

    post {
        always {
            echo "Pipeline finished for ${env.BRANCH_NAME}"
        }
        failure {
            echo "Build failed"
        }
    }
}
