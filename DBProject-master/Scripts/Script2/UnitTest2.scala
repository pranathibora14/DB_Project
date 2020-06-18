import org.apache.spark.{SparkConf, SparkContext}
import org.apache.spark.sql.SQLContext

class UnitTest2 {
  @org.junit.Test
  def Test2() : Unit={
    val conf1 = new SparkConf().setAppName("Joins").setMaster("local[*]")
    val sc1 = new SparkContext(conf1)
    val sqlcontext1 = new SQLContext(sc1)

    val studentdf = sqlcontext1.read.option("header", true).csv("hdfs://localhost:9000/student_data.csv")
    val schooldf = sqlcontext1.read.option("header", true).csv("hdfs://localhost:9000/school_data.csv")

    //studentdf.join(schooldf,Seq("school_id"),"inner").sort().limit(1).show()
    val df=studentdf.join(schooldf,Seq("school_id"),"inner").sort().limit(1)

    val nm = df.select("first_name").collectAsList()
    val n=nm.get(0);
    assert("Ellen"==n.get(0).toString)
  }
}
