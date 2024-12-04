import * as fs from 'fs'
import { execSync } from 'child_process'

// 1. Bundles openapi: resolves all $ref references within the spec
//    and combines the content into a single, consolidated file
// 2. Update version: optional

const bundleAndUpdateVersion = (
  inputFile: string,
  finalSpec: string,
  version?: string
): void => {
  const tempFile = './temp-bundled-openapi.json' // Temporary file to store bundled output

  try {
    // Step 1: Run the Redocly bundle command and write output to a temp file
    console.log('Running Redocly bundle...')
    execSync(`redocly bundle -d ${inputFile} -o ${tempFile}`, {
      stdio: 'inherit'
    })

    // Step 2: Read the bundled file
    console.log('Processing bundled file...')
    const data = fs.readFileSync(tempFile, 'utf-8')
    const spec = JSON.parse(data)

    // Step 3: Update the version if provided
    if (version) {
      if (spec.info?.version) {
        spec.info.version = version
        console.log(`Updated version to ${version}`)
      } else {
        console.error("No 'version' field found in 'info' section.")
        return
      }
    } else {
      console.log('No version specified. Skipping version update.')
    }

    // Step 4: Write the spec to the final output file
    fs.writeFileSync(finalSpec, JSON.stringify(spec, null, 2), 'utf-8')
    console.log(`Bundled OpenAPI spec saved to ${finalSpec}`)
  } catch (error) {
    console.error('Error during bundling or version update:', error)
  } finally {
    // Clean up: Remove the temporary file
    if (fs.existsSync(tempFile)) {
      fs.unlinkSync(tempFile)
      console.log(`Temporary file ${tempFile} has been removed.`)
    }
  }
}

// CLI arguments: inputFile, finalSpec, [version]
const args = process.argv.slice(2)
if (args.length < 2) {
  console.error(
    'Usage: tsx bundleAndUpdateVersion.ts <inputFile> <finalSpec> [version]'
  )
  process.exit(1)
}

const [inputFile, finalSpec, version] = args
bundleAndUpdateVersion(inputFile, finalSpec, version)
