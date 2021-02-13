
plugins {
    kotlin("multiplatform") version "1.4.30"
    `maven-publish`
}

group = "nl.astraeus"
version = "0.1.0-SNAPSHOT"

repositories {
    mavenCentral()
    jcenter()
    maven {
        url = uri("http://nexus.astraeus.nl/nexus/content/groups/public")
    }
}

kotlin {
    /* Targets configuration omitted. 
    *  To find out how to configure the targets, please follow the link:
    *  https://kotlinlang.org/docs/reference/building-mpp-with-gradle.html#setting-up-targets */
    js(IR) {
        binaries.executable()
        browser {
            //produceKotlinLibrary()
            testTask {
                useKarma {
                    useChromeHeadless()
                }
            }
            distribution {
                directory = File("$projectDir/web/")
            }
        }
    }

    sourceSets {
        val commonMain by getting {
            dependencies {
                implementation("nl.astraeus:komp:0.2.5-SNAPSHOT")
            }
        }
        val jsMain by getting {
            dependencies {
                implementation(kotlin("stdlib-js"))
            }
        }
    }
}
